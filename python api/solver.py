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
        unvisited = [start]
        found = False
        while not found:
            try:
                current = unvisited.pop(0)
                current.visited = True
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
                stack.append(random.choice(possible))
            else:
                stack.pop()
        
        for node in stack:
            node.type = "path"
