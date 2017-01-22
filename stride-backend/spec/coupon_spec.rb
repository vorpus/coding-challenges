require_relative '../choco_promo.rb'

RSpec.describe ChocoPromo do


  describe 'initialize' do
    before(:each) do
      @promo = ChocoPromo.new
    end

    it 'is aware of bonus scenarios' do
      expect(@promo.bonus).to be
    end

    it 'has an array to store orders read from CSV' do
      expect(@promo.orders.class).to be(Array)
    end

  end

  describe 'csv reader' do
    before(:each) do
      @promo = ChocoPromo.new
      @promo.process_orders('./input/orders.csv')
    end

    it 'throws away header lines and converts numbers from strings' do
      expect(@promo.orders[0][0]).not_to equal("cash")
      expect(@promo.orders[0][0]).to equal(12)
    end
  end

  describe 'redemptions calculator' do
    before(:each) do
      @promo = ChocoPromo.new
      @promo.process_orders('./input/orders.csv')
    end

    it 'accepts an array of format [integer, integer, integer, string]' do
      expect do
        @promo.get_redemption([6, 2, 2, 'sugar free'])
      end.to_not raise_exception
    end

    it 'calculates total candies that can be purchased' do
      purchase = @promo.get_redemption([12, 4, 4, 'dark'])
      expect(purchase['dark']).to equal(3)
    end

    it 'calculates bonus candies exchanged from wrappers' do
      purchase = @promo.get_redemption([14, 2, 6, 'milk'])
      expect(purchase['milk']).to equal(8)
      expect(purchase['sugar free']).to equal(1)
    end

    it 'calculates additional bonus candies from bonus wrappers' do
      purchase = @promo.get_redemption([6, 2, 2, 'white'])
      expect(purchase['white']).to equal(5)
      expect(purchase['sugar free']).to equal(3)
      expect(purchase['dark']).to equal(1)
    end
  end

  describe 'file output' do
    before(:each) do
      @promo = ChocoPromo.new
      File.delete('./output/redemptions.csv')
    end

    it 'creates the output file' do
      @promo.process_orders('./input/orders.csv')
      reader = CSV.read('./output/redemptions.csv')
      expect(reader).to be
    end

    it "outputs in the correct format 'type #, type #, type #, type #'" do
      @promo.process_orders('./input/orders.csv')
      reader = CSV.read('./output/redemptions.csv')
      expect(reader[0]).to eq(["milk 7", "dark 0", "white 0", "sugar free 1"])
    end
  end
end
