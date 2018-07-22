NAME=Clock Override
DISTNAME=clock-override
UUID=clock-override@gnomeshell.kryogenix.org
VERSION=4

PREFIX=$(HOME)/.local/share/gnome-shell/extensions/

distfiles=metadata.json convenience.js extension.js prefs.js \
          LICENSE schemas/*.compiled schemas/*.gschema.xml

all: build

build: $(distfiles)

metadata.json: Makefile metadata.json.in
	cp metadata.json.in metadata.json
	sed -i -e 's:%_NAME_%:$(NAME):g' metadata.json
	sed -i -e 's:%_UUID_%:$(UUID):g' metadata.json
	sed -i -e 's:%_VERSION_%:$(VERSION):g' metadata.json

schemas/%.compiled: schemas/*.gschema.xml
	glib-compile-schemas --strict schemas/

clean:
	-rm metadata.json
	-rm schemas/*.compiled

dist: distclean build
	zip "${DISTNAME}.zip" -r9 ${distfiles}

distclean:
	-rm "${DISTNAME}.zip"

install: dist
	-mkdir -p $(PREFIX)/$(UUID)
	cp "${DISTNAME}.zip" $(PREFIX)/$(UUID)
	unzip -o "$(PREFIX)/$(UUID)/${DISTNAME}.zip"
	@rm "${DISTNAME}.zip"
	-gnome-shell-extension-tool --reload-extension="$(UUID)"
