#Oliver Temple Computer Science NEA 2022
#python version 3.10.4
#https://github.com/olivertemple/nea
#Solver class for solving mazes in the aws lambda function
import math
class Solver:
    def __init__(self):
        pass

    def get_adjacent_paths(self, Grid, node):#Get adjacent nodes in the grid that are not blocked by a wall
        paths = []
        if node.x > 0 and not node.wallLeft: #check that the node is not on the left edge and that it doesn't have a wall on the left
            paths.append(Grid.grid[node.y][node.x - 1])
        if node.x < Grid.width - 1 and not Grid.grid[node.y][node.x + 1].wallLeft: #check that the node is not on the right edge, and that there is not a wall to the right of it
            paths.append(Grid.grid[node.y][node.x + 1])
        if node.y > 0 and not Grid.grid[node.y - 1][node.x].wallBottom: #check that the node is not at the top and that there isn't a wall above it
            paths.append(Grid.grid[node.y - 1][node.x])
        if node.y < Grid.height - 1 and not node.wallBottom:#check that the node is not at the bottom and that there is no wall below it
            paths.append(Grid.grid[node.y + 1][node.x])
        
        #retrun a list of the available nodes
        return paths

    def dijkstra(self, Grid, start, end):#Dijkstra's algorithm for solving the grid
        #set the distance from the start node to the start node to 0
        start.distance = 0
        #set the start index as 0
        #The index is a number that shows when that node was visited by the solving algorithm, so that when the algorithm is visualized, the react app can show in what order the nodes were visited.
        index = 0
        #create a queue of unvisited nodes
        unvisited = [start]
        #create a flag
        found = False
        while not found:
            #take the next node from the front of the queue
            current = unvisited.pop(0)
            #mark the node as visited
            current.visited = True
            #set the index on the node
            current.index = index
            #increment the index
            index += 1
            #iterate through the available adjacent nodes
            for node in self.get_adjacent_paths(Grid, current):
                #if the node has not been visited already, set the distance from the start node to be one more than the distance of the current node and add it to the queue of unvisited nodes
                if not node.visited:
                    node.distance = current.distance + 1
                    unvisited.append(node)
                
                #if the node is the end node, update the flag and exit the algorithm
                if node == end:
                    found = True
                    break

        #backtrack from the end node to the start node, picking the node with the smallest distance at every point
        current = end
        path = [end]
        while current != start:
            #get connecting cells
            connecting = self.get_adjacent_paths(Grid, current)
            #work out which node as the lowest distance
            min = None
            for node in connecting:
                if node.distance != "infinity":
                    if min == None or node.distance < min.distance:
                        min = node
            #append the node with the lowest distance to the path
            path.append(min)
            #update the current node
            current = min
        
        #draw the path
        for node in path:
            node.type = "path"

    def dfs(self, Grid, start, end):
        #create a stack of nodes to visit
        stack = [start]
        #set the start index as 0
        #The index is a number that shows when that node was visited by the solving algorithm, so that when the algorithm is visualized, the react app can show in what order the nodes were visited.
        start.index = 0
        index = 1
        #while the stack is not empty, keep searching
        while len(stack) > 0:
            #get the item at the top of the stack
            current = stack[-1]
            #mark the item as visited
            current.visited = True
            #check if the end has been found
            if current == end:
                break
        
            #find connecting nodes that have not been visited
            possible = []
            for node in self.get_adjacent_paths(Grid, current):
                if not node.visited:
                    possible.append(node)
            
            #if there are possible connections, choose the first one
            if len(possible) > 0:
                to_append = possible[0]
                #set the index
                to_append.index = index
                #set the parent node for drawing the path
                to_append.parent = current
                #increment the index
                index += 1
                #add the new node to the stack
                stack.append(to_append)
            #If there are no possible connections, remove the current node from the stack
            else:
                stack.pop()
        
        #backtrack from the end to the start drawing the path
        while current != start:
            current.type = "path"
            current = current.parent
        
        start.type = "path"
    
    def bfs(self, Grid, start, end):
        #create a queue of nodes that need to be visited
        queue = [start]
        #set the start index as 0
        #The index is a number that shows when that node was visited by the solving algorithm, so that when the algorithm is visualized, the react app can show in what order the nodes were visited.
        start.index = 0
        index = 1
        #only run the algorithm while there are nodes to visit
        while len(queue) > 0:
            #get the first item in the queue and mark as visitied
            current = queue.pop(0)
            current.visited = True

            #check to see if the end node has been found
            if current == end:
                break
            
            #add unvisited adjacent nodes to the queue
            for node in self.get_adjacent_paths(Grid, current):
                if not node.visited:
                    #update nodes parent for drawing path
                    node.parent = current
                    #add index
                    node.index = index
                    #increment the index
                    index += 1
                    #append node to queue
                    queue.append(node)
        
        #backtrack from the end to the start and draw the path
        while current != start:
            current.type = "path"
            current = current.parent
        
        start.type = "path"

    def manhattan(self, node1, node2):#calculate the manhattan distance between two nodes
        return abs(node1.x - node2.x) + abs(node1.y - node2.y)

    def euclidean(self, node1, node2):#calculate the euclidean distance between two nodes
        return math.sqrt((node1.x - node2.x)**2 + (node1.y - node2.y)**2)

    def greedy(self, Grid, start, end, heuristic):
        #create a priority queue for nodes that need to be visited
        queue = [start]
        #set the start index as 0
        #The index is a number that shows when that node was visited by the solving algorithm, so that when the algorithm is visualized, the react app can show in what order the nodes were visited.
        start.index = 0
        index = 1
        #while there are nodes to visit
        while len(queue) > 0:
            #pop the node off of the front of the queue and mark as visited
            current = queue.pop(0)
            current.visited = True

            #check if the end node has been found
            if current == end:
                break

            #iterate through unvisited adjacent nodes
            for node in self.get_adjacent_paths(Grid, current):
                if not node.visited:
                    #update the parent of the node
                    node.parent = current
                    #update the index
                    node.index = index
                    #increment the index
                    index += 1
                    #use the selected heuristic to update the distance
                    if heuristic == "manhattan":
                        node.distance = self.manhattan(node, end)
                    elif heuristic == "euclidean":
                        node.distance = self.euclidean(node, end)
                    #insert node in the priority queue
                    for item in queue:
                        if item.distance > node.distance:
                            queue.insert(queue.index(item), node)
                            break
                    queue.append(node)
        
        #backtrack from the start and draw the path
        while current != start:
            current.type = "path"
            current = current.parent
        
        start.type = "path"