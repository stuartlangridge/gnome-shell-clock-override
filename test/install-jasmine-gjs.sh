#!/bin/sh
set -ex

tempdir=`mktemp --directory --tmpdir install-jasmin.XXXXXXXXXX`
cd $tempdir
git clone https://github.com/ptomato/jasmine-gjs 
cd jasmine-gjs
./autogen.sh
make
sudo make install
