import random

class Grid:
    def __init__(self, height, width):
        self.height = height
        self.width = width
        self.grid = self.generateGrid()

    def generateGrid(self):
        grid = [];
        for row in range(self.height):
            grid.append([])
            for _ in range(self.width+1):
                grid[row].append({"S":True, "W":True,"contents":"  "})
        grid.append([])
        for _ in range(self.width + 1):
            grid[row+1].append({"S":True, "W":True, "contnets":"  "})
        return grid

    def printGrid(self):
        width = len(self.grid[0])-1
        height = len(self.grid)-1
        print(" __"*width)
        for i in range(height):
            for j in range(width):
                cell = ""
                if self.grid[i][j]["W"]:
                    cell += "|"
                else:
                    cell += " "
                cell += self.grid[i][j]["contents"]

                print(cell, end="")
            print("|")

            for j in range(width):
                cell = ""
                if self.grid[i][j]["W"]:
                    cell += "|"
                else:
                    cell += " "
                if self.grid[i][j]["S"]:
                     cell += "__"
                else:
                    cell += "  "
                
                print(cell, end="")
            print("|")

    def prims(self):
        in_maze=[[0,0]]
        self.grid[0][0]["contents"] = "S "
        visited = [[[0,1],["W"]],[[1,0],["N"]]]

        while len(visited)>0:
            new = visited.pop(random.randint(0, len(visited)-1))
            to_add = new[0]

            wall = new[1][random.randint(0, len(new[1])-1)]

            in_maze.append(to_add)

            if wall == "S":
                self.grid[to_add[0]][to_add[1]]["S"] = False
            
            if wall == "W":
                self.grid[to_add[0]][to_add[1]]["W"] = False
            
            if wall == "N" and to_add[0] > 0:
                self.grid[to_add[0]-1][to_add[1]]["S"] = False
            
            if wall == "E" and to_add[1]< self.width:
                self.grid[to_add[0]][to_add[1]+1]["W"] = False
        
            possible = [[to_add[0]-1, to_add[1]],[to_add[0]+1, to_add[1]],[to_add[0], to_add[1]-1],[to_add[0],to_add[1]+1]]

            for i in range(4):
                p = possible[i]
                walls=["S", "N", "E", "W"]
                wall = walls[i]
                if (0<=p[0]<self.height and 0<=p[1]<self.width):
                    if p not in in_maze:
                        found=False

                        for v in visited:
                            if v[0]==p:
                                v[1].append(wall)
                                found = True
                        if not found:
                            visited.append([p, [wall]])
                


myGrid = Grid(20,20)
myGrid.prims()
myGrid.printGrid()