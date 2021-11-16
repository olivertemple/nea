class Node:
    def __init__(self, x, y, type):
        self.x = x
        self.y = y
        self.type = type

        self.set = None

        self.wallLeft = True
        self.wallBottom = True

    def __str__(self):
        return f"x:{self.x}, y:{self.y}, type:{self.type}, set:{self.set}, wallLeft:{self.wallLeft}, wallBottom:{self.wallBottom}"

    def __dict__(self):
        return {
            "x": self.x,
            "y": self.y,
            "type": self.type,
            "wallLeft": self.wallLeft,
            "wallBottom": self.wallBottom
        }

class Grid:
    def __init__(self, height, width):
        self.height = height
        self.width = width

        self.grid = self.generateGrid()

    def serialize(self):
        obj = {
            "height": self.height,
            "width": self.width,
            "grid": []
        }
        for row in self.grid:
            row_inner = []
            for item in row:
                row_inner.append(item.__dict__())
            obj["grid"].append(row_inner)
        
        return obj
                
        

    def generateGrid(self):
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

