import os
import re
from pathlib import Path

# --- Configuration & Paths ---
DRY_RUN = False 
PREVIEW_FILE = "quarantine_preview.txt"

AUDIT_FILE = Path("audit_combined.txt")
CSS_FILE = Path("assets/css/main.css")
JS_DIR = Path("assets/js")
HTML_DIRS = [Path("."), Path("expt/hologram-expt"), Path("expt/screenprint-expt")]
PROTECTED_CLASSES = ["about-active", "about-page", "dark-mode"]

def parse_audit_file(filepath):
    print(f"[*] Reading {filepath}...")
    classes, ids = set(), set()
    current_section = None
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line: continue
            
            if line.startswith("── Css Classes Not In Html") and "ONLY in" not in line:
                current_section = "classes"
                continue
            elif line.startswith("── Css Ids Not In Html") and "ONLY in" not in line:
                current_section = "ids"
                continue
            elif line.startswith("──") or line.startswith("=="):
                current_section = None
                continue
                
            if current_section == "classes":
                classes.add(line)
            elif current_section == "ids":
                ids.add(line)

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
                    if pattern in content: return True

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

def quarantine_all_css(safe_classes, safe_ids):
    if not CSS_FILE.exists():
        print(f"[!] CSS file not found at {CSS_FILE}")
        return

    with open(CSS_FILE, 'r', encoding='utf-8') as f:
        css_content = f.read()

    preview_output = []
    quarantined_count = 0
    
    # Compile a strict regex pattern for all verified unused items
    target_patterns = []
    for cls in safe_classes:
        target_patterns.append(rf'\.{re.escape(cls)}(?![a-zA-Z0-9_-])')
    for i in safe_ids:
        target_patterns.append(rf'#{re.escape(i)}(?![a-zA-Z0-9_-])')
        
    if not target_patterns:
        print("[*] No targets to quarantine.")
        return
        
    combined_pattern = re.compile("|".join(target_patterns))

    # Safely match entire CSS blocks: selector { body }
    block_pattern = re.compile(r'([^{}]+)\{([^}]+)\}')
    
    def replacer(match):
        nonlocal quarantined_count
        selector_text = match.group(1)
        body_text = match.group(2)
        
        # Check if the block's selector contains any of our targets
        if combined_pattern.search(selector_text):
            quarantined_count += 1
            
            # Neutralize internal comments to prevent CSS syntax breaks!
            safe_selector = selector_text.replace('/*', '/~').replace('*/', '~/')
            safe_body = body_text.replace('/*', '/~').replace('*/', '~/')
            
            quarantine_block = f"\n/* AGENT-QUARANTINE \n{safe_selector}{{ {safe_body} }}\n*/\n"
            
            if DRY_RUN:
                preview_output.append(f"/* TARGET IDENTIFIED IN: */\n{selector_text.strip()} {{ ... }}")
                return match.group(0) # Do not modify code during dry run
            else:
                return quarantine_block
                
        return match.group(0)

    # Process the entire CSS file in one clean pass
    new_css_content = block_pattern.sub(replacer, css_content)

    if DRY_RUN and preview_output:
        with open(PREVIEW_FILE, 'w', encoding='utf-8') as f:
            f.write("\n\n".join(preview_output))
        print(f"[*] Logged {quarantined_count} blocks to {PREVIEW_FILE}.")
    elif not DRY_RUN:
        with open(CSS_FILE, 'w', encoding='utf-8') as f:
            f.write(new_css_content)
        print(f"[*] Successfully Quarantined {quarantined_count} blocks in {CSS_FILE}.")

def main():
    print("--- Starting CSS Quarantine Agent ---")
    if DRY_RUN:
        print("[!] RUNNING IN DRY RUN MODE - main.css will NOT be modified.")
        if os.path.exists(PREVIEW_FILE):
            os.remove(PREVIEW_FILE)
            
    classes, ids = parse_audit_file(AUDIT_FILE)
    
    safe_classes = [cls for cls in classes if not search_usage(cls, is_class=True)]
    safe_ids = [identifier for identifier in ids if not search_usage(identifier, is_class=False)]
            
    print(f"[*] Verification complete. {len(safe_classes)} classes and {len(safe_ids)} IDs are truly safe.")

    quarantine_all_css(safe_classes, safe_ids)
    
    if DRY_RUN:
        print(f"--- Dry Run Complete! Please open {PREVIEW_FILE} to see what would be commented out. ---")
    else:
        print("--- Process Complete! Please review main.css ---")

if __name__ == "__main__":
    main()