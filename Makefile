NAME=Clock Override
DISTNAME=clock-override
UUID=clock-override@gnomeshell.kryogenix.org
VERSION=8

PREFIX=$(HOME)/.local/share/gnome-shell/extensions/

distfiles=metadata.json convenience.js extension.js prefs.js LICENSE  \
          $(wildcard schemas/*.gschema.xml) schemas/gschemas.compiled \
          locale/de/LC_MESSAGES/clock-override.mo \
          locale/nb/LC_MESSAGES/clock-override.mo

.PHONY: all
all: build

.PHONY: build
build: locale/clock-override.pot $(distfiles)

locale/clock-override.pot: prefs.js
	xgettext --from-code=UTF-8 -k_ -kN_ -o $@ $?

%.mo: %.po
	msgfmt $? -o $@

%.po: locale/clock-override.pot
	msgmerge -U $@ $?
	@touch $@

metadata.json: metadata.json.in Makefile
	cp $< $@
	sed -i -e 's:%_NAME_%:$(NAME):g' $@
	sed -i -e 's:%_UUID_%:$(UUID):g' $@
	sed -i -e 's:%_VERSION_%:$(VERSION):g' $@

schemas/gschemas.compiled: $(wildcard schemas/*.gschema.xml)
	glib-compile-schemas --strict schemas/

.PHONY: clean
clean:
	-rm metadata.json
	-rm locale/*/LC_MESSAGES/clock-override.mo
	-rm schemas/*.compiled

${DISTNAME}.zip: $(distfiles)
	zip "${DISTNAME}.zip" -r9 ${distfiles}

.PHONY: dist
dist: ${DISTNAME}.zip

.PHONY: distclean
distclean:
	-rm "${DISTNAME}.zip"

.PHONY: install
install: dist
	-mkdir -p $(PREFIX)/$(UUID)
	-rm -rf $(PREFIX)/$(UUID)/*
	cp "${DISTNAME}.zip" $(PREFIX)/$(UUID)
	cd $(PREFIX)/$(UUID) && unzip -o "${DISTNAME}.zip" && rm "${DISTNAME}.zip"
	-gnome-shell-extension-tool --reload-extension="$(UUID)"
