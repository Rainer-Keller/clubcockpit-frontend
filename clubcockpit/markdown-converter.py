#!/usr/bin/env python3

import markdown
from optparse import OptionParser

parser = OptionParser()
parser.add_option('-i', '--input', dest="input", help="Markdown input file", metavar="FILE")
parser.add_option('-o', '--output', dest="output", help="HTML output file", metavar="FILE")

(options, args) = parser.parse_args()

if not options.input:
        parser.error("Input file not given")
if not options.output:
        parser.error("Output file not given")

markdown = markdown.Markdown(extensions = ['markdown.extensions.tables',
                                               'markdown.extensions.toc',
                                               'markdown.extensions.meta',
                                               ])

with open(options.input, 'r') as source:
    contents = source.read()
    with open(options.output, 'w') as target:
        target.write(markdown.convert(contents))
