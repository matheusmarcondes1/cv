"""Stamp document metadata and the document language onto a PDF in place.

usage: python3 -I src/pdfmeta.py FILE TITLE SUBJECT KEYWORDS LANG [MAX_PAGES]
Keeps the structure tree and outline Chromium wrote (the writer clones the
whole document), and asks viewers to show the title instead of the file name.
With MAX_PAGES, exits with an error (leaving the file unstamped) if the PDF
has more pages than that.
"""
import sys

from pypdf import PdfReader, PdfWriter
from pypdf.generic import BooleanObject, DictionaryObject, NameObject, TextStringObject

path, title, subject, keywords, lang = sys.argv[1:6]
reader = PdfReader(path)
if len(sys.argv) > 6 and len(reader.pages) > int(sys.argv[6]):
    sys.exit(f"{path}: {len(reader.pages)} pages, expected at most {sys.argv[6]}")
writer = PdfWriter(clone_from=reader)
writer.add_metadata({
    "/Title": title,
    "/Author": "Matheus Marcondes de Oliveira",
    "/Subject": subject,
    "/Keywords": keywords,
    "/Creator": "marcondes.dev (src/build.mjs + Chromium)",
})
root = writer._root_object
root[NameObject("/Lang")] = TextStringObject(lang)
prefs = root.get("/ViewerPreferences") or DictionaryObject()
prefs[NameObject("/DisplayDocTitle")] = BooleanObject(True)
root[NameObject("/ViewerPreferences")] = prefs
with open(path, "wb") as fh:
    writer.write(fh)
