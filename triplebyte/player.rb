class Player
  def initialize(name)
    @name = name
  end

  def get_move(board)
    move = gets.chomp.split(",").map(&:to_i)
  end
end

class AIPlayer < Player

  def get_move(board)
    board.empty_cells.sample
  end
end
