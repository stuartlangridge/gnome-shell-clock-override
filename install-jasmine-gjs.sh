#!/bin/sh
set -ex

cd /tmp
git clone https://github.com/ptomato/jasmine-gjs 
cd jasmine-gjs
./autogen.sh
make
sudo make install

