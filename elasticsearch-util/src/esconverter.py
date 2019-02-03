import os
import mmap
path = "../data/"
for filename in os.listdir(path):
    fullpath = path + filename
    with open(fullpath, mode='r+b') as file, mmap.mmap(file.fileno(), 0, access=mmap.ACCESS_WRITE) as mm:
        # first character of the file
        openingBracket = b'{'
        mm[:1] = openingBracket
        # last character of the file
        endLine = mm.rfind(b'\n', 0, len(mm) - 1) + 1
        closingBracket = b'}'
        mm.resize(endLine + len(closingBracket))
        mm[endLine:] = closingBracket
