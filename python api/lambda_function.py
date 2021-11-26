import json
from generator import Generator
from grid import Grid
from solver import Solver
from grid import Node
def lambda_handler(event, context):
    #get the parameters from the url query
    width = event["queryStringParameters"]["width"]
    height = event["queryStringParameters"]["height"]
    if event["queryStringParameters"]["type"] == "empty_maze":
        myGrid = Grid(int(width), int(height))
    elif event["queryStringParameters"]["type"] == "generate":
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

    elif event["queryStringParameters"]["type"] == "solve":
        grid = json.loads(event["body"])

        myGrid = Grid(int(grid["width"]), int(grid["height"]))
        myGrid.load(grid["grid"])
        
        solve_algorithm = event["queryStringParameters"]["solve"]
        start = eval(event["queryStringParameters"]["start"])
        end = eval(event["queryStringParameters"]["end"])
        start_node = myGrid.grid[start[0]][start[1]]
        end_node = myGrid.grid[end[0]][end[1]]
        mySolver = Solver()

        if solve_algorithm == "dijkstra":
            mySolver.dijkstra(myGrid, start_node, end_node)
        elif solve_algorithm == "dfs":
            mySolver.dfs(myGrid, start_node, end_node)
        elif solve_algorithm == "bfs":
            mySolver.bfs(myGrid, start_node, end_node)

    #return the json of the grid
    return {
        'statusCode': 200,
        'body': json.dumps(myGrid.serialize())
    }
if __name__ == "__main__":#for development purposes
    myGenerator = Generator()
    myGrid = Grid(15,15)
    myGenerator.prims(myGrid)
    myGrid.printGrid()
    mySolver = Solver()
    mySolver.dfs(myGrid, myGrid.grid[0][0], myGrid.grid[14][14])
    myGrid.printGrid()
