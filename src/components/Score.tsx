interface Props {
    currentMoves: number, 
    bestMoves: number
}

export default ({currentMoves, bestMoves}: Props) => {
    return (
        <div style={{paddingBottom: '15px'}}>
            <h1 style={{marginTop: 0}}>Best moves: {bestMoves === Infinity ? 0 : bestMoves}</h1>
            <h1>Current moves: {currentMoves}</h1>
        </div>
    );
};