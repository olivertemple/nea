import random
class Generator:
    def __init__(self):
        pass
    def recursive_backtracking(self, Grid):#setup for recursive backtracking
        #create a list of all nodes in maze
        unvisited = []
        for row in Grid.grid:
            for item in row:
                unvisited.append(item)

        #pick a random start node
        start = random.choice(unvisited)
        unvisited.remove(start)

        #start recursive backtracking
        self.recursive_backtracking_run(Grid, unvisited, start, [])
    def recursive_backtracking_run(self, Grid, unvisited, current, previous):#recursive backtracking algorithm
        #work out which walls can be removed
        orientation_options = []
        if current.x > 0 and Grid.grid[current.y][current.x-1] in unvisited:
            orientation_options.append("left")
        if current.y > 0 and Grid.grid[current.y-1][current.x] in unvisited:
            orientation_options.append("top")
        if current.x < Grid.width - 1 and Grid.grid[current.y][current.x+1] in unvisited:
            orientation_options.append("right")
        if current.y < Grid.height - 1 and Grid.grid[current.y+1][current.x] in unvisited:
            orientation_options.append("bottom")

        #if there are no walls to remove, backtrack, else pick one and remove it
        if len(orientation_options) > 0:
            #pick a random wall to remove
            orientation = random.choice(orientation_options)
            #add the current node to the previous nodes list
            previous.append(current)

            #remove the wall depending on the orientation
            if orientation == "left":
                connecting_cell = Grid.grid[current.y][current.x - 1]
                current.wallLeft = False
          
            elif orientation == "bottom":
                connecting_cell = Grid.grid[current.y + 1][current.x]
                current.wallBottom = False
            
            elif orientation == "right":
                connecting_cell = Grid.grid[current.y][current.x + 1]
                connecting_cell.wallLeft = False
         
            elif orientation == "top":
                connecting_cell = Grid.grid[current.y - 1][current.x]
                connecting_cell.wallBottom = False

            #remove the connecting node from the unvisited list
            unvisited.remove(connecting_cell)

            #recurse
            self.recursive_backtracking_run(Grid, unvisited, connecting_cell, previous)
        else:
            #if not back at the start, backtrack
            if len(previous) > 0:
                new = previous.pop()
                self.recursive_backtracking_run(Grid, unvisited, new, previous)
    def prims(self, Grid):#generate a maze using prims algorithm
        #start at the top left node
        inMaze = [[0, 0]]
        #create a list of nodes connected to the start node
        frontier = [[[0, 1],["left"]],[[1, 0],["top"]]]

        #while there are still nodes to visit
        while (len(frontier) > 0):
            #pick a random node from the frontier
            new = frontier.pop(random.randint(0, len(frontier)-1))

            toAdd = new[0]

            #pick a random wall from the available walls
            wall = new[1][random.randint(0, len(new[1])-1)]

            #add the wall to the inMaze list
            inMaze.append(toAdd)

            #remove the selected wall from the grid
            if wall == "bottom":
                Grid.grid[toAdd[0]][toAdd[1]].wallBottom = False
            
            if wall == "left":
                Grid.grid[toAdd[0]][toAdd[1]].wallLeft = False
            
            if wall == "top" and toAdd[0] > 0:
                Grid.grid[toAdd[0]-1][toAdd[1]].wallBottom = False

            if wall == "right" and toAdd[1] < Grid.width:
                Grid.grid[toAdd[0]][toAdd[1]+1].wallLeft = False
            
            #calculate the possible nodes to add to the frontier
            possible = [[toAdd[0]-1, toAdd[1]],[toAdd[0]+1,toAdd[1]],[toAdd[0],toAdd[1]-1],[toAdd[0], toAdd[1]+1]]

            #possible walls
            walls = ["bottom", "top", "right", "left"]
            #iterate through the possible nodes
            for i in range(4):
                p = possible[i]
                wall = walls[i]
                #check that the wall can be removed
                if 0<=p[0]<Grid.height and 0<=p[1]<Grid.width:
                    #check that the node is not already in the maze
                    if p not in inMaze:
                        found = False
                        #check if the node is already in the frontier, if it is then add the wall to the possible walls for the node in the frontier
                        for v in frontier:
                            if v[0]==p:
                                v[1].append(wall)
                                found = True
                        #if the node is not in the frontier, add it to the frontier
                        if not found:
                            frontier.append([p,[wall]])