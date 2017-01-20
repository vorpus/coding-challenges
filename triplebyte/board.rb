require_relative 'player'

class Board
  def initialize()
    @grid = nil
    reset_grid!
  end

  def reset_grid!
    @grid = Array.new(3) { Array.new(3) }
  end

  def [](coord)
    @grid[coord[0]][coord[1]]
  end

  def []=(coord, mark)
    @grid[coord[0]][coord[1]] = mark
  end

  def place_token(coord, mark)
    self[coord] = mark
  end

  def display
    @grid.each do |row|
      this_row = []
      row.each do |cell|
        if cell
          this_row << cell
        else
          this_row << "-"
        end
      end
      displayed = this_row.join("|")
      print displayed
      print "\n"
    end
  end

  def empty_cells
    empty = []
    @grid.each_with_index do |row, i|
      row.each_with_index do |cell, j|
        empty << [i, j] unless cell
      end
    end
    empty
  end

  def full?
    return true if empty_cells.empty?
    false
  end
end

if __FILE__ == $PROGRAM_NAME
  b = Board.new()
  ai = AIPlayer.new('ai')

  b.display
  p b.full?
  (0).upto(2) do |i|
    (0).upto(1) do |j|
      b.place_token([i,j], :x)
    end
  end
  b.display
  p ai.get_move(b)
end
