import {useRef, useEffect} from "react";

const GameCanvas = () => {
    const canvRef = useRef(null);

    useEffect (() => {
        console.log("It's go time!");

        if(window.Module){
            window.Module.canvas = canvRef.current;
            console.log("Done!");
        } else {
            console.error("C++ file not found.");
        }
        
        return() => {
            console.log("Clearing things up...");
            if (window.Module) window.Module.canvas = null;
        };
    }, []);

    return(
        <div className = "game-wrapper">
            <canvas ref = {canvRef} id = "canvas" onContextMenu = {(e) => e.preventDefault()} />
        </div>
    );
}

export default GameCanvas;