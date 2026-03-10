# V2 Cleanup Inventory

- Seed entrypoint: `index.html`
- Reachability: recursive local references from HTML/CSS/JS (`href/src/data-src/poster/fetch/url()`).
- Used files: 129
- Candidate-unused files: 68
- High-confidence quarantine candidates: 22
- Medium-confidence review candidates: 42
- Keep (non-runtime infra/docs): 4

## Output Files
- `cleanup-inventory/used-files.txt`
- `cleanup-inventory/candidate-unused.txt`
- `cleanup-inventory/high-confidence-quarantine.txt`
- `cleanup-inventory/medium-confidence-review.txt`
- `cleanup-inventory/keep-nonruntime.txt`

## Notes
- High-confidence list is suitable for a first quarantine move.
- Medium-confidence list should be reviewed visually in browser before moving.
- Keep list are intentionally retained (deployment/docs/editor config).
- Confirmed intentional repo changes from user:
- `hologram-expt/hologramtest.html` is deleted.
- `halftone-expt/` was renamed to `screenprint-expt/`.

## Post-Quarantine Snapshot
- `cleanup-inventory/used-files.post-quarantine.txt`: 129 files
- `cleanup-inventory/candidate-unused.post-quarantine.txt`: 46 files
- `_quarantine/2026-03-09/`: first safe quarantine batch (moved, not deleted)

## Batch 1 (Images) Status
- Scanner improved to include `srcset` and filenames with spaces.
- Latest inventories:
- `cleanup-inventory/used-files.post-quarantine.v3.txt`: 136 files
- `cleanup-inventory/candidate-unused.post-quarantine.v3.txt`: 39 files
- `cleanup-inventory/batch1-images-quarantine.txt`: 28 image/media/json files moved to quarantine
- Validation after move: all v3-used files still present (`missing_used_v3 = 0`)

## Batch 2 (Sass) Status
- `cleanup-inventory/batch2-sass-quarantine.txt`: 7 files moved to quarantine
- `cleanup-inventory/used-files.post-quarantine.v4.txt`: 136 files
- `cleanup-inventory/candidate-unused.post-quarantine.v4.txt`: 4 files
- Remaining candidates are keep/non-runtime files only:
- `.vscode/settings.json`, `CNAME`, `LICENSE.txt`, `README.txt`
- Validation after move: all v3-used files still present (`missing_used_v3_after_batch2 = 0`)
