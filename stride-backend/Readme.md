## Objective
ChocoPromo reads orders as CSV from a local directory and creates a CSV file containing a customer's total chocolate count considering current store promotions.

## Running ChocoPromo

### Installing Ruby
ChocoPromo requires a local installation of Ruby (Written in 2.2.3p173). Most OSX systems ship with Ruby already installed. The installation can be updated using the [homebrew](http://brew.sh/) package manager.
```
$ brew install ruby
```
### Executing app
With no arguments provided, ChocoPromo will look for the input file in `input/orders.csv`.
```
@~/path-to/stride-backend> ruby choco_promo.rb
```

Alternatively, you can specify an alternate file path from the CLI.
```
@~/path-to/stride-backend> ruby choco_promo.rb 'input/orders.csv'
```

ChocoPromo creates an output file in `output/redemptions.csv`. There are no messages displayed to console unless the program has failed.

## Testing
Unit tests have been provided to test functionality of the methods provided by ChocoPromo. The tests require installation of the RSpec gem.

```
gem install rspec
```

With RSpec installed, the tests can be run in the command line by navigating to the directory of the code test and invoking rspec
```
@~/path-to/stride-backend> rspec
```

## Assumptions

A few assumptions were made to simplify the file I/O logic:

* orders.csv will always be have columns in the same order (cash, price, wrappers needed, type)
* ordrs.csv may have an arbitrary number of header rows that can be thrown away when parsing
