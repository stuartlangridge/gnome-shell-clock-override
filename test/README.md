# Unit Tests for gnome-shell-clock-override

## Executing Unit Tests

### Using the make file

In the root directory execute `make test` to run all unit tests. Results will be displayed in a terse form.

### Using run-tests.sh

THe directory `test` contains the script `run-tests.sh` which will also run all unit tests. Unlike the makefile the results will be displayed verbose.

### Using jasmine-gjs directly

Of course you can always execute `jasmine` directly an pass it the necessary configuration. For more information please refer to the [Jasmine documentation](https://jasmine.github.io/pages/docs_home.html).

## Installing Unit Test Dependencies

To to be able to execute the unit tests [jasmine-gjs](https://github.com/ptomato/jasmine-gjs) must be installed. The script `install-jasmine-gjs.sh` can be used to automatically clone, build and install it.
