import random

class Generator:
    def __init__(self):
        pass

    def kruskal(self, Grid):   
        availableWalls = []
        for row in Grid.grid:
            for item in row:
                availableWalls.append(item)
        self.runKruskal(Grid, availableWalls)   

    def runKruskal(self, Grid, availableWalls):
        joined = []
        while len(availableWalls) > 0 :
            wall = random.choice(availableWalls) 
            availableWalls.remove(wall)
            options = []
            if wall.x > 0:
                options.append("left")
            if wall.y < Grid.height - 1:
                options.append("bottom")
            if len(options) > 0:
                orientation = random.choice(options)
                cell = Grid.grid[wall.y][wall.x]
                if orientation == "left":
                    cell.wallLeft = False
                    joinedCell = Grid.grid[wall.y][wall.x - 1]
                elif orientation == "bottom":
                    cell.wallBottom = False
                    joinedCell = Grid.grid[wall.y + 1][wall.x]

                if cell.set:
                    if joinedCell.set:
                        cellSet = joined[cell.set]
                        
                        for i in range(cell.set, len(joined)):
                            for j in range(len(joined[i])):
                                joined[i][j].set -= 1
                        joined.remove(cellSet)

                        for item in cellSet:
                            item.set = joinedCell.set
                        joined[joinedCell.set] += cellSet
                        
                    else:
                        joinedCell.set = cell.set
                        joined[cell.set].append(joinedCell)   
                else:
                    if joinedCell.set:
                        cell.set = joinedCell.set
                        joined[joinedCell.set].append(cell)
                    
                    else:
                        setIndex = len(joined)
                        cell.set, joinedCell.set = setIndex, setIndex
                        joined.append([cell, joinedCell])

    def prims(self, Grid):
        inMaze = [[0, 0]]
        frontier = [[[0, 1],["left"]],[[1, 0],["top"]]]

        while (len(frontier) > 0):
            new = frontier.pop(random.randint(0, len(frontier)-1))

            toAdd = new[0]

            wall = new[1][random.randint(0, len(new[1])-1)]

            inMaze.append(toAdd)

            if wall == "bottom":
                Grid.grid[toAdd[0]][toAdd[1]].wallBottom = False
            
            if wall == "left":
                Grid.grid[toAdd[0]][toAdd[1]].wallLeft = False
            
            if wall == "top" and toAdd[0] > 0:
                Grid.grid[toAdd[0]-1][toAdd[1]].wallBottom = False

            if wall == "right" and toAdd[1] < Grid.width:
                Grid.grid[toAdd[0]][toAdd[1]+1].wallLeft = False
            
            possible = [[toAdd[0]-1, toAdd[1]],[toAdd[0]+1,toAdd[1]],[toAdd[0],toAdd[1]-1],[toAdd[0], toAdd[1]+1]]

            for i in range(4):
                p = possible[i]
                walls = ["bottom", "top", "right", "left"]
                wall = walls[i]
                if 0<=p[0]<Grid.height and 0<=p[1]<Grid.width:
                    if p not in inMaze:
                        found = False
                        for v in frontier:
                            if v[0]==p:
                                v[1].append(wall)
                                found = True
                        if not found:
                            frontier.append([p,[wall]])