# Pandora 1.0.0 distribution

The Vercel build reconstructs the three original .mrpack files from pack-parts/. Common compressed bytes are stored once. Each archive is checked against its exact original byte count and SHA-256 before being served. To build locally: node scripts/build-downloads.cjs. Generated public/downloads files are build outputs; do not edit or commit them separately. For a future release regenerate the binary parts and update the expected checksums, filenames and download links together.

These archives are the user's supplied final exports, unchanged. Archive integrity and shared mod manifest checked; game runtime acceptance is separate.
