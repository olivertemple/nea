import random

WIDTH=40
HEIGHT=20

def generate_grid(WIDTH,HEIGHT): #generates a 2D array, in each cell is a dictionary
       grid=list()               #the dictionary stores Booleans for "S" and "W" indicating whether there is a wall to the South or west
       for row in range(HEIGHT): #(True)=there is a wall,False, there is not. Also "a 2 character contents" for future use
              grid.append([])
              for col in range(WIDTH):
                     grid[row].append({"S":True,"W":True,"contents":"  "})
              grid[row].append({"S":False,"W":True,"contents":"  "}) #Note that I am actually storing a WIDTH+1 x HEIGHT+1 array to allow for walls on final cells
       grid.append([])
       for col in range(WIDTH+1):
              grid[row+1].append({"S":False,"W":False,"contents":"  "})
                     

                          
       return grid

def print_grid(grid): #prints the grid
       print(grid)
       WIDTH=len(grid[0])-1 #adjustment for increased array size as noted above
       HEIGHT=len(grid)-1
       print(" __"*WIDTH)
       for i in range(HEIGHT):
              for j in range(WIDTH):
                     cell=""
                     if grid[i][j]["W"]:
                            cell+="|"
                     else:
                            cell+=" "
                     cell+=grid[i][j]["contents"] #here I am allowing for 2 character contents to be printed 
                     print(cell,end="")
                     
              print("|")
              for j in range(WIDTH):
                     cell=""
                     if grid[i][j]["W"]:
                            cell+="|"
                     else:
                            cell+=" "
                     if grid[i][j]["S"]:
                            cell+="__"
                     else:
                            cell+="  "
                     print(cell,end="")
                     
              print("|")

grid=generate_grid(WIDTH,HEIGHT)


in_maze=[[0,0]]
grid[0][0]["contents"]="S "
visited=[[[0,1],["W"]],[[1,0],["N"]]] #the visited list stores cells which are adjacent to a cell in the maze, and possible connections
                                      #to cells currently in the maze



while(len(visited)>0):

       new=visited.pop(random.randint(0,len(visited)-1)) #pick a random cell from the visited list
       to_add=new[0]

       wall=new[1][random.randint(0,len(new[1])-1)]     #pick a random wall to remove, from those stored with the cell as connecting to the maze
       

       in_maze.append(to_add)                           #add the new cell to the maze
       if wall=="S":
              
              grid[to_add[0]][to_add[1]]["S"]=False #delete the appropiate wall
       if wall=="W":
              
              grid[to_add[0]][to_add[1]]["W"]=False       
       if wall=="N" and to_add[0]>0:
              
              grid[to_add[0]-1][to_add[1]]["S"]=False
       if wall=="E" and to_add[1]<WIDTH:
              
              grid[to_add[0]][to_add[1]+1]["W"]=False
              
       
       possible=[[to_add[0]-1,to_add[1]],[to_add[0]+1,to_add[1]],[to_add[0],to_add[1]-1],[to_add[0],to_add[1]+1]] #idientify neighbours of the new cell not currently in the maze...
       for i in range(4):
              p=possible[i]
              walls=["S","N","E","W"]
              wall=walls[i]
              if 0<=p[0]<HEIGHT and 0<=p[1]<WIDTH:
                     if p not in in_maze:
                            found=False
                            for v in visited:  #and add these to "visited" along with the wall between the new cell and the neighbour
                                   if v[0]==p:  #...If the neighbour is already in visited, then add another wall option to it
                                         v[1].append(wall)
                                         found=True
                            if not found:
                                   visited.append([p,[wall]])
                                   

print_grid(grid)

              
