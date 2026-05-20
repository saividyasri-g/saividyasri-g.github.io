#!/usr/bin/env python3
"""
CSS Usage Auditor
=================
Scans main.css for declarations (custom properties, classes, IDs, colors,
keyframes, transitions) and checks which ones are actually referenced
in the target HTML files.

Usage:
    python3 audit_tokens.py

Output:
    - audit_index.json        (unused items for index.html)
    - audit_project_hmc.json  (unused items for project-hmc.html)
    - audit_combined.txt      (human-readable summary — items unused in BOTH pages)

Edit the paths below if your file structure differs.
"""

import re
import json
from pathlib import Path
from collections import defaultdict

# ──────────────────────────────────────────────
# CONFIG — edit these paths to match your project
# ──────────────────────────────────────────────
CSS_FILE = Path("assets/css/main.css")
HTML_FILES = {
    "index": Path("index.html"),
    "project_hmc": Path("project-hmc.html"),
    "project_tbm": Path("project-tbm.html"),
    "project_coursecompass": Path("project-coursecompass.html"),
    "project_fid": Path("project-fid.html"),
    "expt_hologram": Path("expt/hologram-expt/hologram.html"),
    "expt_screenprint": Path("expt/screenprint-expt/screenprint.html"),
}
# Pages with embedded <style> blocks — audited against their own CSS, not main.css
EMBEDDED_CSS_PAGES = {"expt_hologram", "expt_screenprint"}
# ──────────────────────────────────────────────


def read(path):
    return path.read_text(encoding="utf-8", errors="replace")


def extract_embedded_css(html_text):
    """Return concatenated content of all <style>...</style> blocks."""
    blocks = re.findall(r'<style[^>]*>(.*?)</style>', html_text, re.DOTALL | re.IGNORECASE)
    return "\n".join(blocks)


def extract_css_custom_properties(css_text):
    """Find all --var-name declarations in CSS."""
    return set(re.findall(r'(--[\w-]+)\s*:', css_text))


def extract_css_custom_property_usages(text):
    """Find all var(--name) references in a text blob."""
    return set(re.findall(r'var\((--[\w-]+)', text))


def extract_css_classes(css_text):
    """Extract class selectors from CSS (e.g. .my-class)."""
    # Matches .class-name but not inside url(), content, or color hex
    raw = re.findall(r'(?<![#\w])\.([a-zA-Z_][\w-]*)', css_text)
    # Filter out common false positives
    noise = {'0', '5s', '1s', '2s', '3s', '4s', '5', '6', '7', '8', '9'}
    return set(r for r in raw if r not in noise and len(r) > 1)


def extract_html_classes(html_text):
    """Extract all class names referenced in HTML class attributes."""
    class_attrs = re.findall(r'class\s*=\s*["\']([^"\']*)["\']', html_text)
    classes = set()
    for attr in class_attrs:
        for c in attr.split():
            classes.add(c)
    return classes


def extract_html_ids(html_text):
    return set(re.findall(r'id\s*=\s*["\']([^"\']*)["\']', html_text))


def extract_css_ids(css_text):
    return set(re.findall(r'#([a-zA-Z_][\w-]*)', css_text))


def extract_keyframes(css_text):
    return set(re.findall(r'@keyframes\s+([\w-]+)', css_text))


def extract_animation_refs(text):
    """Find animation-name and animation shorthand references."""
    refs = set()
    # animation-name: foo
    refs.update(re.findall(r'animation-name\s*:\s*([\w-]+)', text))
    # animation: foo 1s ease ...
    refs.update(re.findall(r'animation\s*:\s*([\w-]+)', text))
    return refs


def extract_hex_colors(css_text):
    """Extract unique hex colors from CSS."""
    raw = re.findall(r'#([0-9a-fA-F]{3,8})\b', css_text)
    colors = set()
    for h in raw:
        if len(h) in (3, 4, 6, 8) and not re.match(r'^[a-fA-F]+$', h):
            colors.add('#' + h.lower())
    return colors


def extract_body_classes(css_text):
    """Find body.class-name selectors."""
    return set(re.findall(r'body\.([\w-]+)', css_text))


def audit(css_text, html_text, html_name):
    """Run all audits and return dict of unused items."""
    results = {}

    # 1. Custom properties
    defined_vars = extract_css_custom_properties(css_text)
    used_in_css = extract_css_custom_property_usages(css_text)
    used_in_html = extract_css_custom_property_usages(html_text)
    all_var_usages = used_in_css | used_in_html
    # A var is "unused" if it's defined but never referenced via var()
    # (it might still be defined and used as a raw value, but that's a smell)
    unused_vars = sorted(defined_vars - all_var_usages)
    results["unused_custom_properties"] = unused_vars

    # 2. CSS classes not in HTML
    css_classes = extract_css_classes(css_text)
    html_classes = extract_html_classes(html_text)
    # Also check for JS-toggled classes referenced in HTML <script> tags
    js_class_refs = set(re.findall(r'["\']([a-zA-Z][\w-]*)["\']', html_text))
    all_html_refs = html_classes | js_class_refs
    unused_classes = sorted(css_classes - all_html_refs)
    results["css_classes_not_in_html"] = unused_classes
    results["css_classes_total"] = len(css_classes)
    results["css_classes_unused_count"] = len(unused_classes)

    # 3. CSS IDs not in HTML
    css_ids = extract_css_ids(css_text)
    html_ids = extract_html_ids(html_text)
    js_id_refs = set(re.findall(r'getElementById\(["\']([^"\']+)', html_text))
    all_id_refs = html_ids | js_id_refs
    unused_ids = sorted(css_ids - all_id_refs)
    # Filter out hex-color false positives (IDs that look like colors)
    unused_ids = [i for i in unused_ids if not re.match(r'^[0-9a-fA-F]{3,8}$', i)]
    results["css_ids_not_in_html"] = unused_ids

    # 4. Keyframes defined but not called
    defined_kf = extract_keyframes(css_text)
    used_kf = extract_animation_refs(css_text) | extract_animation_refs(html_text)
    unused_kf = sorted(defined_kf - used_kf)
    results["unused_keyframes"] = unused_kf

    # 5. Body-state classes in CSS not set in HTML/JS
    body_classes_css = extract_body_classes(css_text)
    body_class_refs = set()
    # Check for classList.add, className, body.class patterns in JS
    body_class_refs.update(re.findall(r'classList\.(?:add|toggle|contains)\(["\']([^"\']+)', html_text))
    body_class_refs.update(re.findall(r'body\.([\w-]+)', html_text))
    body_class_refs.update(re.findall(r'addClass\(["\']([^"\']+)', html_text))
    # Also check <body class="...">
    body_tag_match = re.search(r'<body[^>]*class\s*=\s*["\']([^"\']*)["\']', html_text)
    if body_tag_match:
        body_class_refs.update(body_tag_match.group(1).split())
    unused_body = sorted(body_classes_css - body_class_refs)
    results["body_state_classes_not_in_html"] = unused_body

    # 6. Hex colors in CSS (for reference — not "unused" per se, just inventory)
    results["hex_colors_in_css"] = sorted(extract_hex_colors(css_text))

    return results


def main():
    css_text = read(CSS_FILE)
    all_results = {}

    for name, path in HTML_FILES.items():
        if not path.exists():
            print(f"⚠  Skipping {path} — file not found")
            continue
        html_text = read(path)
        if name in EMBEDDED_CSS_PAGES:
            page_css = extract_embedded_css(html_text)
        else:
            page_css = css_text
        result = audit(page_css, html_text, name)
        all_results[name] = result

        # Write per-page JSON
        out_path = f"audit_{name}.json"
        with open(out_path, "w") as f:
            json.dump(result, f, indent=2)
        print(f"✓  {out_path} written ({result['css_classes_unused_count']} unused classes)")

    # Combined report: items unused in ALL main pages (experiment pages use separate CSS)
    main_keys = [k for k in all_results if k not in EMBEDDED_CSS_PAGES]
    expt_keys = [k for k in all_results if k in EMBEDDED_CSS_PAGES]

    if len(main_keys) >= 2:
        combined = {}
        fields = [
            "unused_custom_properties",
            "css_classes_not_in_html",
            "css_ids_not_in_html",
            "unused_keyframes",
            "body_state_classes_not_in_html",
        ]

        for field in fields:
            sets = [set(all_results[k].get(field, [])) for k in main_keys]
            intersection = sets[0]
            for s in sets[1:]:
                intersection &= s
            combined[field] = sorted(intersection)

        with open("audit_combined.txt", "w") as f:
            f.write("=" * 60 + "\n")
            f.write("UNUSED IN ALL MAIN PAGES — safe to remove from main.css\n")
            f.write("=" * 60 + "\n\n")

            for field, items in combined.items():
                label = field.replace("_", " ").title()
                f.write(f"── {label} ({len(items)}) ──\n")
                if items:
                    for item in items:
                        f.write(f"  {item}\n")
                else:
                    f.write("  (none — all are used somewhere)\n")
                f.write("\n")

            # Per-page-only unused (main pages only)
            f.write("\n" + "=" * 60 + "\n")
            f.write("PAGE-SPECIFIC UNUSED (only unused on one main page)\n")
            f.write("=" * 60 + "\n\n")

            for field in ["unused_custom_properties", "css_classes_not_in_html"]:
                label = field.replace("_", " ").title()
                for k in main_keys:
                    page_set = set(all_results[k].get(field, []))
                    other_sets = [set(all_results[ok].get(field, [])) for ok in main_keys if ok != k]
                    only_this = page_set
                    for os in other_sets:
                        only_this = only_this - os
                    f.write(f"── {label} unused ONLY in {k} ({len(only_this)}) ──\n")
                    for item in sorted(only_this)[:50]:
                        f.write(f"  {item}\n")
                    if len(only_this) > 50:
                        f.write(f"  ... and {len(only_this) - 50} more\n")
                    f.write("\n")

            # Experiment pages — their own embedded CSS audit
            if expt_keys:
                f.write("\n" + "=" * 60 + "\n")
                f.write("EXPERIMENT PAGES — embedded CSS audit\n")
                f.write("=" * 60 + "\n\n")

                for k in expt_keys:
                    r = all_results[k]
                    f.write(f"── {k} ──\n")
                    for field in ["unused_custom_properties", "css_classes_not_in_html",
                                  "css_ids_not_in_html", "unused_keyframes",
                                  "body_state_classes_not_in_html"]:
                        items = r.get(field, [])
                        if items:
                            label = field.replace("_", " ").title()
                            f.write(f"  {label} ({len(items)}):\n")
                            for item in items:
                                f.write(f"    {item}\n")
                    f.write("\n")

        print(f"✓  audit_combined.txt written")
        print(f"\n   Globally unused custom properties: {len(combined['unused_custom_properties'])}")
        print(f"   Globally unused classes:            {len(combined['css_classes_not_in_html'])}")
        print(f"   Globally unused IDs:                {len(combined['css_ids_not_in_html'])}")
        print(f"   Globally unused keyframes:          {len(combined['unused_keyframes'])}")
        print(f"   Globally unused body states:        {len(combined['body_state_classes_not_in_html'])}")
        if expt_keys:
            for k in expt_keys:
                r = all_results[k]
                print(f"\n   {k} embedded CSS unused classes: {r['css_classes_unused_count']}"
                      f"  |  unused vars: {len(r['unused_custom_properties'])}")


if __name__ == "__main__":
    main()