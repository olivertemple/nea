from generator import Generator

class Node:
    def __init__(self, x, y, type):
        self.x = x
        self.y = y
        self.type = type
        self.contents = ""

        self.wallLeft = True
        self.wallBottom = True

class Grid:
    def __init__(self, height, width):
        self.height = height
        self.width = width

        self.grid = self.generateGrid()

    def generateGrid(self):
        grid = []
        for i in range(self.height):
            row = []
            for j in range(self.width):
                row.append(Node(j, i, "space"))
            row.append(Node(i, j+1, "space"))
            grid.append(row)
        
        row = []
        for j in range(self.width + 1):
            row.append(Node(i+1, j, "space"))
        grid.append(row)

        return grid

    def printGrid(self):

        width = self.width
        height = self.height

        print(" __"*width)

        for i in range(height):
            for j in range(width):
                cell = ""
                if self.grid[i][j].wallLeft:
                    cell += "|"
                else:
                    cell += " "
                cell += "  "
                print(cell, end="")
            print("|")
            
            for j in range(width):
                cell = ""
                if self.grid[i][j].wallLeft:
                    cell += "|"
                else:
                    cell += " "
                
                if self.grid[i][j].wallBottom:
                    cell += "__"
                else:
                    cell += "  "
                print(cell, end="")  
            print("|")



    #!226 single thread - Will H
        

myGenerator = Generator();

myGrid = Grid(20,40)
Generator.prims(myGrid)
myGrid.printGrid()