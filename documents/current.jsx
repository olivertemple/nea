<input type="range" defaultValue={0.3 - this.props.speed} min={0.01} max={0.3} step={0.01} onChange={(e) => {this.props.setSpeed(0.3 - e.target.value)}} /> 