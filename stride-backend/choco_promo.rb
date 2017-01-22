require 'csv'

class ChocoPromo
  attr_reader :bonus, :orders
  def initialize()
    @bonus = {
      'milk' => {
        'milk' => 1,
        'sugar free' => 1
      },
      'white' => {
        'white' => 1,
        'sugar free' => 1
      },
      'sugar free' => {
        'dark' => 1,
        'sugar free' => 1
      },
      'dark' => {
        'dark' => 1
      }
    }

    @orders = []
  end

  def process_orders(file_name)
    set_prices!(CSV.read(file_name))
    process_and_print_file
  end

  def set_prices!(csv)
    cleaned = parse_file(csv)
    @orders = cleaned.select {|ar| ar[0].is_a?(Integer)}
  end

  def parse_file(csv)
    cleaned_file = []

    csv.each do |line|
      cleaned_file << line.map do |el|
        matched_val = /[0-9]+/.match(el).to_s.to_i
        matched_val > 0 ? matched_val : /[a-z]+(\s[a-z]+)?/.match(el).to_s
      end
    end

    cleaned_file
  end

  def get_redemption(order)
    candies = EMPTY_BASKET.clone
    wrappers = EMPTY_BASKET.clone

    candies[order[3]] = order[0]/order[1]
    wrappers[order[3]] = candies[order[3]]

    get_bonus(candies, wrappers, order[2])
    candies
  end

  def get_bonus(candies, wrappers, price)

    finished = false
    until finished
      finished = true
      wrappers.each do |k,v|
        if price <= v
          wrappers[k] -= price
          @bonus[k].each do |bonus_k, bonus_v|
            candies[bonus_k] += bonus_v
            wrappers[bonus_k] += bonus_v
          end
          finished = false
        end
      end
    end
  end

  def process_and_print_file
    CSV.open('./output/redemptions.csv', "wb") do |csv|
      @orders.each do |line|
        result = get_redemption(line)
        csv << ["milk #{result['milk']}", "dark #{result['dark']}",
                "white #{result['white']}", "sugar free #{result['sugar free']}"]
      end
    end
  end

  EMPTY_BASKET = {
    'milk' => 0,
    'white' => 0,
    'sugar free' => 0,
    'dark' => 0
  }
end

if __FILE__ == $PROGRAM_NAME
  file_name = ARGV[0] ? ARGV[0] : './input/orders.csv'
  this_promo = ChocoPromo.new()
  this_promo.process_orders(file_name)
end
