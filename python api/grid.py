#Node class for each node in the grid
class Node:
    def __init__(self, x, y, type):
        self.x = x
        self.y = y
        self.type = type

        self.index = None
        self.parent = None
        self.visited = False

        self.distance = "infinity"

        self.wallLeft = True
        self.wallBottom = True
    def __str__(self):#for development purposes
        return f"x:{self.x}, y:{self.y}, type:{self.type}, wallLeft:{self.wallLeft}, wallBottom:{self.wallBottom}, distance:{self.distance}"
    def load(self, wallLeft, wallBottom):#when loading the grid, the walls must be set from the received grid
        self.wallBottom = wallBottom
        self.wallLeft = wallLeft
    def serialize(self):#for returning the grid, the node must be serialized into a dictionary
        return {
            "x": self.x,
            "y": self.y,
            "wallLeft": self.wallLeft,
            "wallBottom": self.wallBottom,
            "type": self.type,
            "index":self.index
        }

class Grid:#Grid class for the grid
    def __init__(self, height, width):
        self.height = height
        self.width = width
        self.grid = self.generateGrid()
    def load(self, grid):#load the grid from the grid received from the react app
        self.grid = []
        for row in grid:
            row_inner = []
            for item in row:
                node = Node(item["x"], item["y"], "space")
                node.load(item["wallLeft"], item["wallBottom"])
                row_inner.append(node)
            self.grid.append(row_inner)
    def serialize(self):#for returning the grid, the grid must be serialized into a dictionary
        obj = {
            "height": self.height,
            "width": self.width,
            "grid": []
        }
        for row in self.grid:
            row_inner = []
            for item in row:
                row_inner.append(item.serialize())
            obj["grid"].append(row_inner)
        
        return obj
    def generateGrid(self):#generate the grid
        grid = []
        for i in range(self.height):
            row = []
            for j in range(self.width):
                row.append(Node(j, i, "space"))
            row.append(Node(j, i, "space"))
            grid.append(row)
        
        row = []
        for j in range(self.width + 1):
            row.append(Node(j, i, "space"))
        grid.append(row)

        return grid
    def printGrid(self):#for development purposes
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
                if self.grid[i][j].type == "path":
                    cell += "XX"
                else:
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
