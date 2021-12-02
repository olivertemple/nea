import json
from generator import Generator
from grid import Grid
from solver import Solver
def lambda_handler(event, context):
    #get the parameters from the url query
    width = event["queryStringParameters"]["width"]
    height = event["queryStringParameters"]["height"]

    if event["queryStringParameters"]["type"] == "empty_maze":#generate an empty grid
        myGrid = Grid(int(width), int(height))

    elif event["queryStringParameters"]["type"] == "generate":#generate an empty grid, then create a maze
        #get the maze generating algorithm
        generate_algorithm = event["queryStringParameters"]["generate"]
        
        #create a new generator to generate the maze
        myGenerator = Generator();

        #create a new grid with the height and width algorithms from the query
        myGrid = Grid(int(width),int(height))

        #generate the maze using the algorithm from the query
        if generate_algorithm == "prims":
            myGenerator.prims(myGrid)
        elif generate_algorithm == "recursive_backtracking":
            myGenerator.recursive_backtracking(myGrid)

    elif event["queryStringParameters"]["type"] == "solve":#solve the maze using requested algorithm
        #get the grid from the body of the request
        grid = json.loads(event["body"])

        #generate an empty grid with the same size as the grid from the body
        myGrid = Grid(int(grid["width"]), int(grid["height"]))

        #load the grid from the body into the empty grid by iterating through the nodes and changing the attributes
        myGrid.load(grid["grid"])
        
        #get the solving algorithm from the request
        solve_algorithm = event["queryStringParameters"]["solve"]
        
        #get the start and node positions from the request
        start = eval(event["queryStringParameters"]["start"])
        end = eval(event["queryStringParameters"]["end"])

        #get the start and end nodes in the grid
        start_node = myGrid.grid[start[0]][start[1]]
        end_node = myGrid.grid[end[0]][end[1]]

        #create a new solver to solve the maze
        mySolver = Solver()

        #solve the maze with the requested algorithm
        if solve_algorithm == "dijkstra":
            mySolver.dijkstra(myGrid, start_node, end_node)
        elif solve_algorithm == "dfs":
            mySolver.dfs(myGrid, start_node, end_node)
        elif solve_algorithm == "bfs":
            mySolver.bfs(myGrid, start_node, end_node)
        elif solve_algorithm == "greedy":
            #get the heuristic for greedy from the request
            heuristic = event["queryStringParameters"]["heuristic"]
            mySolver.greedy(myGrid, start_node, end_node, heuristic)

    #return the json of the grid
    return {
        'statusCode': 200,
        'body': json.dumps(myGrid.serialize())
    }

if __name__ == "__main__":
    myGrid = Grid(15,15)
    myGenerator = Generator()
    myGenerator.prims(myGrid)
    mySolver = Solver()
    mySolver.greedy(myGrid, myGrid.grid[0][0], myGrid.grid[14][14], "manhattan")
    myGrid.printGrid()