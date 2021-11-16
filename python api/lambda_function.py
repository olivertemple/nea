import json
from generator import Generator
from grid import Grid
def lambda_handler(event, context):
    width = event["queryStringParameters"]["width"]
    height = event["queryStringParameters"]["height"]
    algorithm = event["queryStringParameters"]["algorithm"]
    
    myGenerator = Generator();
    myGrid = Grid(int(width),int(height))
    if algorithm == "prims":
        myGenerator.prims(myGrid)
    elif algorithm == "kruskal":
        myGenerator.kruskal(myGrid)
    
    return {
        'statusCode': 200,
        'body': json.dumps(myGrid.serialize())
    }

