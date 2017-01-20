require_relative 'board'
require_relative 'player'

class Game
  def initialize(p1, p2)
    @players = {x: p1, o: p2}
    @turn = :x
    @board = Board.new()
  end

  def play
    until @board.full?
      @board.display
      move = @players[@turn].get_move(@board)
      @board.place_token(move, @turn)
      switch_player
    end
  end

  def switch_player
    if @turn == :x
      @turn = :o
    else
      @turn = :x
    end
  end
end

if __FILE__ == $PROGRAM_NAME
  p1 = Player.new('li')
  p2 = AIPlayer.new('ai')

  g = Game.new(p1, p2)
  g.play
end
