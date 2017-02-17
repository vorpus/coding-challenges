## Objective
ChocoPromo reads orders as CSV from a local directory and creates a CSV file containing a customer's total chocolate count considering current store promotions.

## Methods

Two methods were made available publicly to allow quick redemption checks (`get_redemption`) and batch checks using file upload (`process_orders`). The rest of the methods are considered helper methods that the user should not have access to except through the two public methods.

### Public methods
`process_orders( file_name )` parses the CSV and stores orders into the `@orders` class variable.

`get_redemption( order )` reads an array of form `[dollars, price, redemption_amt, choco_type]` and returns the count of chocolates a customer will finish with after all promotions. The output will be a hash with string keys corresponding to chocolate type and integer values corresponding to chocolate count.

### Private methods
`set_prices!` is a helper method for `process_orders` to set the `@orders` class variable

`parse_file` is a helper method for `process_orders`. It uses regular expressions to convert relevant numbers to integers and chocolate types into usable strings.

`get_bonus` calculates total chocolates after redeeming the store's promotions.

`process_and_print_file` outputs the final count to CSV.

## Running ChocoPromo

### Installing Ruby
ChocoPromo requires a local installation of Ruby (Written in 2.2.3). Most OSX systems ship with Ruby already installed. The installation can be updated using the [homebrew](http://brew.sh/) package manager.
```
$ brew install ruby
```
### Executing app
With no arguments provided, ChocoPromo will look for the input file in `input/orders.csv`.
```
@~/path-to/stride-backend> ruby choco_promo.rb
```

Alternatively, you can specify an alternate input file path from the CLI.
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

* `orders.csv` will always be have columns in the same order (cash, price, wrappers needed, type)
* columns will use integer values
* `orders.csv` may have an arbitrary number of header rows that can be thrown away when parsing
* per `instructions.md`, output was to be in the format `milk 0, dark 1, white 5, sugar free 3`. Although this will be difficult for the next tool to parse, I assume that functionality was already built in and that's the reason why this output format was specified.
