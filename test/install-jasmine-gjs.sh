#!/bin/sh
set -ex

tempdir=`mktemp --directory --tmpdir install-jasmin.XXXXXXXXXX`
git clone https://github.com/ptomato/jasmine-gjs $tempdir
cd $tempdir
./autogen.sh
make
sudo make install
