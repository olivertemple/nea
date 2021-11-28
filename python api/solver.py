import random
class Solver:
    def __init__(self):
        pass
    def get_adjacent_paths(self, Grid, node):#Get adjacent nodes in the grid that are not blocked by a wall
        paths = []
        if node.x > 0 and not node.wallLeft:
            paths.append(Grid.grid[node.y][node.x - 1])
        if node.x < Grid.width - 1 and not Grid.grid[node.y][node.x + 1].wallLeft:
            paths.append(Grid.grid[node.y][node.x + 1])
        if node.y > 0 and not Grid.grid[node.y - 1][node.x].wallBottom:
            paths.append(Grid.grid[node.y - 1][node.x])
        if node.y < Grid.height - 1 and not node.wallBottom:
            paths.append(Grid.grid[node.y + 1][node.x])
        
        return paths
    def dijkstra(self, Grid, start, end):#Dijkstra's algorithm for solving the grid
        start.distance = 0
        index = 0
        unvisited = [start]
        found = False
        while not found:
            try:
                current = unvisited.pop(0)
                current.visited = True
                current.index = index
                index += 1
                for node in self.get_adjacent_paths(Grid, current):
                    if not node.visited:
                        node.distance = current.distance + 1
                        unvisited.append(node)
                    if node == end:
                        found = True
                        break
            except:
                pass
        
        current = end
        path = [end]
        while current != start:
            connecting = self.get_adjacent_paths(Grid, current)
            min = None
            for node in connecting:
                if node.distance != "infinity":
                    if min == None or node.distance < min.distance:
                        min = node
            path.append(min)
            current = min
        for node in path:
            node.type = "path"

    def dfs(self, Grid, start, end):
        stack = [start]
        start.index = 0
        index = 1
        while len(stack) > 0:
            current = stack[-1]
            current.visited = True
            if current == end:
                break
            possible = []
            for node in self.get_adjacent_paths(Grid, current):
                if not node.visited:
                    possible.append(node)
            
            if len(possible) > 0:
                to_append = random.choice(possible)
                to_append.index = index
                to_append.parent = current
                index += 1
                stack.append(to_append)
            else:
                stack.pop()
        
        for node in stack:
            node.type = "path"
    
    def bfs(self, Grid, start, end):
        queue = [start]
        start.index = 0
        index = 1
        while len(queue) > 0:
            current = queue.pop(0)
            current.visited = True

            if current == end:
                break

            for node in self.get_adjacent_paths(Grid, current):
                if not node.visited:
                    node.parent = current
                    node.index = index
                    index += 1
                    queue.append(node)
        
        while current != start:
            current.type = "path"
            current = current.parent
        
        start.type = "path"

    def manhattan(self, node1, node2):
        return abs(node1.x - node2.x) + abs(node1.y - node2.y)

    def greedy(self, Grid, start, end):
        queue = [start]
        start.index = 0
        index = 1
        while len(queue) > 0:
            current = queue.pop(0)
            current.visited = True

            if current == end:
                break

            for node in self.get_adjacent_paths(Grid, current):
                if not node.visited:
                    node.parent = current
                    node.index = index
                    index += 1
                    node.distance = self.manhattan(node, end)
                    for item in queue:
                        if item.distance > node.distance:
                            queue.insert(queue.index(item), node)
                            break
                    queue.append(node)
        
        while current != start:
            current.type = "path"
            current = current.parent
        
        start.type = "path"