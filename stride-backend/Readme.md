# Stride Code Test

Should you have any issues, questions or improvements please do not hesitate to contact us by emailing
codetest@stridenyc.com.

* Note: please do not share this test or your solution with anyone for they are intended to be private. If you decide to
put it on github via fork or import, please do so in a private repository.

### Requirements

 - You may complete the test in a language of your choice, though Java and Ruby are preferred.
 - Please refrain from using third party libraries in your solution, with one exception that you may use testing related
 libraries.
 - Please submit your solution in a zip file. We will not accept Github forks or links to code on Github or any similar
 host.
 - Please tell us what language you used to implement your solution.

### Assessment

- Your code will be assessed on the following:
    - Design
    - Correctness
    - Code quality metrics such as cleanliness, readability, maintainability and simplicity.
    Please create a solution that you would consider to be *good* code.
    - Test quality and maintainability.
    - You will be assessed on the quality of your automated tests as much as by the quality of your code, please take
    time to include them.
    - This is not a timed coding test. You will not be graded on how quickly you submit your solution. Please take your
    time in devising your solution.
- We ARE NOT concerned with how fast the code performs. (It's a small chocolate store!)
- Please write production quality code, don't just solve the problem quickly.
- Style and aesthetics count! Good references for what we consider to be strong Object Oriented code are
Sandi Metz's ["Practial Object Oriented Design in Ruby"](http://www.poodr.com/) and
[code samples from it](https://github.com/skmetz/poodr/)

### Running Your Solution

- Please tell us how to execute your program. We expect to be able to run it and for it to generate an output file.
- Please ensure that any automated tests you submit can be executed easily and successfully (hint: use a build tool).

### Anonymize Your Solution

All submitted code tests will be anonymized before they are given to an assessor. To aid in this it is important that
you do not add your name, Github profile or any other identifying information to any file you submit as a part of the
solution (i.e. nothing in the submitted ZIP file is to identify you).

## The Problem

There is a chocolate store that sells white, dark, milk and sugar free chocolate bars. When a shopper places an order for chocolate, store staff specify the price of the chocolate and the number of wrappers that must be returned in order to receive free chocolates. The price of the chocolate and the number of wrappers required to receive a free chocolate changes with every order as the shop is still experimenting with how the promotion should work.

### Promotion Rules

- When a shopper trades the required number of:
  - `milk` wrappers they will receive one complimentary `milk` chocolate and one complimentary `sugar free` chocolate.
  - `white` wrappers they will receive one complimentary `white` chocolate and one complimentary `sugar free` chocolate.
  - `sugar free` wrappers they will receive one complimentary `sugar free` chocolate and one complimentary `dark`
  chocolate.
  - `dark` wrappers they will receive one complimentary `dark` chocolate.

### The Orders File

Orders placed by different shoppers can be found in the CSV file `input/orders.csv`. The first line of this file
contains header information, each subsequent line represents an order. The header format is:

    cash, price, wrappers needed, type

- Cash: the amount of cash the shopper has to spend on chocolate.

- Price: the price of a single chocolate.

- Wrappers needed: is the number of wrappers that must be traded in, in order to receive free chocolate. This number
applies to all chocolates irrespective of its type.

- Type: the type of chocolate the shopper is buying in that order.

There are four orders in the `input/orders.csv` file. Every line in `input/orders.csv` is a separate order with a
different `price` and number of `wrappers needed`. Orders are independent of each other, the `cash`, `price` and
`wrappers needed` of one order does not affect any other order.

### Instructions

Write a program which reads the contents of `input/orders.csv`. Using the promotion rules, your program is to generate
output to a file named `output/redemptions.csv`. Each line in `input/orders.csv` is to result in a line in
`output/redemptions.csv`. Each line in the output file should have the format:

    milk N, dark N, white N, sugar free N

Where `N` is the number of chocolates of that type they possess at the conclusion of all possible trades. You
are to assume that all shoppers trade everything they can and therefore redeem as much chocolate as they possibly can.

Given the data in `input/orders.csv`, a correct program will generate the following output:

    milk 7, dark 0, white 0, sugar free 1
    milk 0, dark 3, white 0, sugar free 0
    milk 0, dark 3, white 0, sugar free 5
    milk 0, dark 1, white 5, sugar free 3

### Example

#### input/orders.csv
    cash, price, wrappers needed, type

    14, 2, 6, 'milk'

Using the above order as an example, the shopper has $14. Each chocolate costs $2 so the shopper is able to buy 7
`milk` chocolates ($14/$2). The promotion states that the shopper will receive a complimentary `milk` chocolate for
every 6 wrappers traded in (because `wrappers needed` is 6 for this order). The shopper has 7 wrappers, so can trade in
6 wrappers and receives a complimentary `milk` chocolate. Additionally, the shopper is given a complimentary
`sugar free` chocolate. The shopper will end up with 8 `milk` chocolates and 1 `sugar free` chocolate.

In this example, the file `output/redemptions.csv` should contain the following:

#### output/redemptions.csv

    milk 8, dark 0, white 0, sugar free 1

### More examples

#### input/orders.csv

    Input: 12, 2, 5, 'milk'

#### output/redemptions.csv

    Output: milk 7, dark 0, white 0, sugar free 1

The shopper buys 6 `milk` chocolates and trades in 5 wrappers to get 1 free `milk` chocolate. They also get one
`sugar free`.

-

#### input/orders.csv
    Input: 12, 4, 4, 'dark'

#### output/redemptions.csv
    Output: milk 0, dark 3, white 0, sugar free 0

The shopper buys 3 `dark` chocolates, but since `wrappers needed` is 4 they can't trade any wrappers in.

-

#### input/orders.csv
    Input: 6, 2, 2, 'sugar free'

#### output/redemptions.csv
    Output: milk 0, dark 3, white 0, sugar free 5

The shopper can buy 3 `sugar free` chocolates for $6. They can trade 2 of their 3 wrappers and get 1 complimentary
`sugar free` chocolate and 1 complimentary `dark` chocolate. The shopper now has 4 `sugar free` chocolates, and one
`sugar free` wrapper left from the first trade. They use the leftover wrapper and the wrapper from the complimentary
`sugar free` chocolate to get another complimentary `sugar free` chocolate and a complimentary `dark` chocolate. At this
point the shopper has a total of 5 `sugar free` chocolates. And since they got 2 `dark` chocolates, they can trade both
of those in for an extra `dark`. Final total: 5 `sugar free` chocolates, 3 `dark` chocolates.

-

#### input/orders.csv
    Input: 6, 2, 2, 'white'

#### output/redemptions.csv
    Output:  milk 0, dark 1, white 5, sugar free 3

The shopper buys 3 `white` and trades in 2 `white` wrappers for 1 `white` and 1 `sugar` free. Now they can use the extra
`white` wrapper to get another `white` and another `sugar free`. Those 2 `sugar free` wrappers get another `sugar free`
and a `dark`.
