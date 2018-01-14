all: doc

doc: doc/beschreibung-clubcockpit.html

%.html: %.md
	./markdown-converter.py -i $^ -o $@
