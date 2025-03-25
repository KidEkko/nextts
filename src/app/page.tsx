"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { CanvasPath, ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DownloadIcon, Eraser, Redo, Save, Trash2, Undo } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

interface Drawing {
  id: string;
  paths: CanvasPath[];
  dataURL: string;
  name: string;
  createdAt: Date;
}

const strokeWidths = [1, 2, 4, 6, 8];
const eraserWidths = [5, 10, 20, 30];

// Color options for stroke and background
const colorOptions = [
  { value: "#ffffff", label: "White", bg: "white"},
  { value: "#000000", label: "Black", bg: "black" },
  { value: "#ff0000", label: "Red", bg: "bg-red-100" },
  { value: "#00ff00", label: "Green", bg: "bg-green-100" },
  { value: "#0000ff", label: "Blue", bg: "bg-blue-100" },
  { value: "#ffff00", label: "Yellow", bg: "bg-yellow-100" },
];

const DrawingApp: React.FC = () => {
  // Canvas reference and state management
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [eraserWidth, setEraserWidth] = useState<number>(10);
  const [strokeColor, setStrokeColor] = useState<string>("#000000");
  const [drawingName, setName] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [savedDrawings, setSavedDrawings] = useState<Drawing[]>([]);

  useEffect(() => {
    if (!canvasRef) return;
    canvasRef.current?.eraseMode(isErasing);
  },[isErasing])

  // Handler for saving the current drawing
  const handleSaveDrawing = useCallback(async () => {
    if (!canvasRef.current) return;

    let name = drawingName;
    const alreadyThere = savedDrawings.filter((drawing) => drawing.name === drawingName);
    if (alreadyThere.length > 0) {
      name += ` (${alreadyThere.length - 1})`
    }

    const paths = await canvasRef.current.exportPaths();
    if (!paths.length) return;

    const imageURL = await canvasRef.current.exportImage("png"); 
    const newDrawing: Drawing = {
      id: crypto.randomUUID(),
      paths,
      dataURL: imageURL,
      name: !!name ? name : `Drawing ${savedDrawings.length + 1}`,
      createdAt: new Date(),
    };

    setSavedDrawings((prev) => [...prev, newDrawing]);
    canvasRef.current.clearCanvas();
  },[canvasRef, savedDrawings, setSavedDrawings, drawingName]);

  const handleDeleteDrawing = useCallback((id: string) => {
    setSavedDrawings((prev) => prev.filter((d) => d.id !== id));
  },[setSavedDrawings]);

  // Handler for loading a saved drawing
  const handleLoadDrawing = useCallback((drawing: Drawing) => {
    if (!canvasRef.current) return;
    canvasRef.current.clearCanvas();
    canvasRef.current.loadPaths(drawing.paths);
  },[canvasRef]);

  // Handler for downloading a drawing as PNG
  const handleDownloadDrawing = useCallback(async (drawing: Drawing) => {
    const link = document.createElement("a");
    link.download = `${drawing.name}.png`;
    link.href = drawing.dataURL;
    link.click();
  },[]);


  const handleUndoClick = useCallback(() => {
    canvasRef.current?.undo();
  },[canvasRef])

  const handleRedoClick = useCallback(() => {
    canvasRef.current?.redo();
  },[canvasRef])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6 text-center">Drawing App</h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Stroke Width</label>
          <Select
            value={strokeWidth.toString()}
            onValueChange={(value) => setStrokeWidth(Number(value))}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {strokeWidths.map((width) => (
                <SelectItem key={width} value={width.toString()}>
                  {width}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Eraser Width</label>
          <Select
            value={eraserWidth.toString()}
            onValueChange={(value) => setEraserWidth(Number(value))}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {eraserWidths.map((width) => (
                <SelectItem key={width} value={width.toString()}>
                  {width}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Stroke Color</label>
          <Select
            value={strokeColor}
            onValueChange={(value) => setStrokeColor(value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((color) => (
                <SelectItem className={`cursor-pointer ${color.bg}`} key={color.value} value={color.value}>
                  {color.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Background Color</label>
          <Select
            value={backgroundColor}
            onValueChange={(value) => setBackgroundColor(value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((color) => (
                <SelectItem className={`cursor-pointer ${color.bg}`} key={color.value} value={color.value}>
                  {color.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isErasing ? "destructive" : "outline"}
                onClick={() => setIsErasing(!isErasing)}
                className="self-end"
              >
                <Eraser />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Toggle Erasing {isErasing ? "Off" : "On"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={handleUndoClick}
                className="self-end"
              >
                <Undo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Undo
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={handleRedoClick}
                className="self-end"
              >
                <Redo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Redo
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </div>

      {/* Canvas */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          canvasColor={backgroundColor}
          eraserWidth={eraserWidth}
          width="100%"
          height="400px"
          className="w-full"
        />
      </div>

      <div className="flex flex-row space-x-2 max-w-4xl mx-auto my-4 rounded-lg shadow-md ">
        <Input className="bg-white" placeholder="Your Drawing's Name" onChange={(e) => setName(e.target.value)} ></Input>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
            <Button onClick={handleSaveDrawing} className="self-end">
              <Save />
            </Button>
            </TooltipTrigger>
            <TooltipContent>
              Save Drawing
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Saved Drawings */}
      {savedDrawings.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">Saved Drawings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedDrawings.map((drawing) => (
              <motion.div
                key={drawing.id}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2 items-center"
              >
                <span className="text-base">
                  {drawing.name} 
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadDrawing(drawing)}
                  >
                    Load
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadDrawing(drawing)}
                  >
                    <DownloadIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteDrawing(drawing.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DrawingApp;