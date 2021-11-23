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
    else:
        generate_algorithm = event["queryStringParameters"]["generate"]
        solve_algorithm = event["queryStringParameters"]["solve"]
        start = eval(event["queryStringParameters"]["start"])
        end = eval(event["queryStringParameters"]["end"])
        
        #create a new generator to generate the maze
        myGenerator = Generator();

        #create a new grid with the height and width algorithms from the query
        myGrid = Grid(int(width),int(height))

        #generate the maze using the algorithm from the query
        if generate_algorithm == "prims":
            myGenerator.prims(myGrid)
        elif generate_algorithm == "recursive_backtracking":
            myGenerator.recursive_backtracking(myGrid)
        start_node = myGrid.grid[start[1]][start[0]]
        end_node = myGrid.grid[end[1]][end[0]]
        
        mySolver = Solver()

        if solve_algorithm == "dijkstra":
            mySolver.dijkstra(myGrid, start_node, end_node)

    #return the json of the grid
    return {
        'statusCode': 200,
        'body': json.dumps(myGrid.serialize())
    }

#for development purposes
if __name__ == "__main__":
    myGenerator = Generator()
    myGrid = Grid(22,22)
    myGenerator.recursive_backtracking(myGrid)
    myGrid.printGrid()
    mySolver = Solver()
    mySolver.dijkstra(myGrid, myGrid.grid[0][0], myGrid.grid[21][21])
