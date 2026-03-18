import React, {useRef, useEffect} from "react";

const GameCanvas = () => {
    const canvRef = useRef(null);

    useEffect (() => {
        console.log("It's go time!");
    }, []);

    window.Module = {
        print: (text) => console.log('C++ says: ' + text),
        canvas: document.getElementById('canvas'),
        onRunTimeInitialized: () => {
            console.log("Emscripten Bridge established!");
        }
    }

    return(
        <div className = "game-wrapper">
            <canvas ref = {canvRef} id = "canvas" onContextMenu = {(e) => e.preventDefault()} />
        </div>
    )
}