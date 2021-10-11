import random

class Generator:
    def prims(Grid):
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
            
            if wall == "right" and toAdd[1] < Grid.width:
                Grid.grid[toAdd[0]][toAdd[1]+1].wallLeft = False
            
            if wall == "top" and toAdd[0] > 0:
                Grid.grid[toAdd[0]-1][toAdd[1]].wallBottom = False
            
            possible = [[toAdd[0]-1, toAdd[1]],[toAdd[0]+1,toAdd[1]],[toAdd[0],toAdd[0]-1],[toAdd[0], toAdd[1]+1]]

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