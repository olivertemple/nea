<input type="range" defaultValue={this.props.speed} min={0.01} max={0.3} step={0.01} onChange={(e) => {this.props.setSpeed(e.target.value)}} />  