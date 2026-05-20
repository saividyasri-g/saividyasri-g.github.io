import os
import re
from pathlib import Path

# --- Configuration & Paths ---
# SAFETY SWITCH: Set to False only when you are ready to modify main.css
DRY_RUN = True 
PREVIEW_FILE = "quarantine_preview.txt"

AUDIT_FILE = Path("audit_combined.txt")
CSS_FILE = Path("assets/css/main.css")
JS_DIR = Path("assets/js")
HTML_DIRS = [Path("."), Path("expt/hologram-expt"), Path("expt/screenprint-expt")]
PROTECTED_CLASSES = ["about-active", "about-page", "dark-mode"]

def parse_audit_file(filepath):
    print(f"[*] Reading {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    classes = set(re.findall(r'\.([a-zA-Z0-9_-]+)', content))
    ids = set(re.findall(r'#([a-zA-Z0-9_-]+)', content))
    classes = {c for c in classes if c not in PROTECTED_CLASSES}
    
    print(f"[*] Found {len(classes)} potential unused classes and {len(ids)} unused IDs.")
    return classes, ids

def search_usage(target, is_class=True):
    search_patterns = [target, f".{target}" if is_class else f"#{target}"]
    
    if JS_DIR.exists():
        for js_file in JS_DIR.glob("*.js"):
            with open(js_file, 'r', encoding='utf-8') as f:
                content = f.read()
                for pattern in search_patterns:
                    if pattern in content:
                        return True

    for html_dir in HTML_DIRS:
        if html_dir.exists():
            for html_file in html_dir.glob("*.html"):
                with open(html_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if is_class and re.search(rf'class="[^"]*\b{target}\b[^"]*"', content):
                        return True
                    elif not is_class and re.search(rf'id="{target}"', content):
                        return True
    return False

def quarantine_css(safe_targets, is_class=True):
    if not CSS_FILE.exists():
        print(f"[!] CSS file not found at {CSS_FILE}")
        return

    with open(CSS_FILE, 'r', encoding='utf-8') as f:
        css_content = f.read()

    quarantined_count = 0
    preview_output = []

    for target in safe_targets:
        prefix = "." if is_class else "#"
        selector = f"{prefix}{target}"
        pattern = rf'({re.escape(selector)}(?:\s*|:[^{{]*?)\{{[^}}]+\}})'
        
        match = re.search(pattern, css_content)
        if match:
            if DRY_RUN:
                preview_output.append(f"/* TARGET IDENTIFIED: {selector} */\n{match.group(1)}\n")
            else:
                css_content = re.sub(pattern, r'/* AGENT-QUARANTINE \n\1\n*/', css_content)
            quarantined_count += 1

    if DRY_RUN and preview_output:
        mode = 'a' if is_class else 'w' # Write for the first batch, append for the second
        with open(PREVIEW_FILE, mode, encoding='utf-8') as f:
            f.write("\n\n".join(preview_output))
    elif not DRY_RUN:
        with open(CSS_FILE, 'w', encoding='utf-8') as f:
            f.write(css_content)
    
    action = "Logged" if DRY_RUN else "Quarantined"
    print(f"[*] {action} {quarantined_count} {'classes' if is_class else 'IDs'}.")

def main():
    print("--- Starting CSS Quarantine Agent ---")
    if DRY_RUN:
        print("[!] RUNNING IN DRY RUN MODE - main.css will NOT be modified.")
        # Clear out any old preview file
        if os.path.exists(PREVIEW_FILE):
            os.remove(PREVIEW_FILE)
            
    classes, ids = parse_audit_file(AUDIT_FILE)
    
    safe_classes = [cls for cls in classes if not search_usage(cls, is_class=True)]
    safe_ids = [identifier for identifier in ids if not search_usage(identifier, is_class=False)]
            
    print(f"[*] Verification complete. {len(safe_classes)} classes and {len(safe_ids)} IDs are truly safe.")

    quarantine_css(safe_classes, is_class=True)
    quarantine_css(safe_ids, is_class=False)
    
    if DRY_RUN:
        print(f"--- Dry Run Complete! Please open {PREVIEW_FILE} to see what would be commented out. ---")
    else:
        print("--- Process Complete! Please review main.css ---")

if __name__ == "__main__":
    main()