import json
from generator import Generator
from grid import Grid
def lambda_handler(event, context):
    #get the parameters from the url query
    width = event["queryStringParameters"]["width"]
    height = event["queryStringParameters"]["height"]
    algorithm = event["queryStringParameters"]["algorithm"]
    
    #create a new generator to generate the maze
    myGenerator = Generator();

    #create a new grid with the height and width algorithms from the query
    myGrid = Grid(int(width),int(height))

    #generate the maze using the algorithm from the query
    if algorithm == "prims":
        myGenerator.prims(myGrid)
    elif algorithm == "recursive_backtracking":
        myGenerator.recursive_backtracking(myGrid)
    
    #return the json of the grid
    return {
        'statusCode': 200,
        'body': json.dumps(myGrid.serialize())
    }

#for development purposes
if __name__ == "__main__":
    myGenerator = Generator();
    myGrid = Grid(10,10)
    myGenerator.prims(myGrid)
    myGrid.printGrid()