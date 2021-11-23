class Solver:
    def __init__(self):
        pass

    def f(self, current, start, steps):
        return abs(current.x - start.x) + abs(current.y - start.y) + steps

    def get_adjacent_paths(self, Grid, node):
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


    def dijkstra(self, Grid, start, end):
        start.distance = 0
        unvisited = [start]
        visited = []
        path = []
        found = False
        while not found:
            try:
                current = unvisited.pop(0)
                visited.append(current)
                for node in self.get_adjacent_paths(Grid, current):
                    if node not in visited:
                        node.distance = current.distance + 1
                        unvisited.append(node)
                    if node == end:
                        found = True
                        break
            except:
                pass
        
        current = end
        while current != start:
            connecting = self.get_adjacent_paths(Grid, current)
            min = None
            for node in connecting:
                if node.distance != "infinity":
                    if min == None or node.distance < min.distance:
                        min = node
            path.append(min)
            current = min
        print(path)
        for node in path:
            node.type = "path"
