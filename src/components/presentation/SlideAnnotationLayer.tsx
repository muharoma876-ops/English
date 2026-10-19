import React, { useRef, useState, useEffect } from 'react';
import { DrawStroke } from '../../types/presentation';
import { Undo2, Trash2, Palette, Eraser, Pen } from 'lucide-react';

interface SlideAnnotationLayerProps {
  active: boolean;
  slideId: string;
}

export function SlideAnnotationLayer({ active, slideId }: SlideAnnotationLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ef4444');
  const [lineWidth, setLineWidth] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [strokesBySlide, setStrokesBySlide] = useState<Record<string, DrawStroke[]>>({});
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);

  const currentStrokes = strokesBySlide[slideId] || [];

  // Redraw canvas whenever strokes or slide changes
  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const strokes = strokesBySlide[slideId] || [];
    strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.moveTo(stroke.points[0].x * canvas.width, stroke.points[0].y * canvas.height);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x * canvas.width, stroke.points[i].y * canvas.height);
      }
      ctx.stroke();
    });
  };

  useEffect(() => {
    redraw();
  }, [slideId, strokesBySlide]);

  // Sync canvas dimensions
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      redraw();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!active) return null;

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const p = getPos(e);
    setCurrentStroke([p]);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.beginPath();
      ctx.strokeStyle = isEraser ? 'rgba(0,0,0,1)' : color;
      ctx.lineWidth = isEraser ? 24 : lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(p.x * canvas.width, p.y * canvas.height);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const p = getPos(e);
    setCurrentStroke((prev) => [...prev, p]);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      if (isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }
      ctx.lineTo(p.x * canvas.width, p.y * canvas.height);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentStroke.length > 1 && !isEraser) {
      const newStroke: DrawStroke = {
        color,
        size: lineWidth,
        points: currentStroke,
      };
      setStrokesBySlide((prev) => ({
        ...prev,
        [slideId]: [...(prev[slideId] || []), newStroke],
      }));
    }
    setCurrentStroke([]);
  };

  const handleUndo = () => {
    setStrokesBySlide((prev) => {
      const list = prev[slideId] || [];
      return {
        ...prev,
        [slideId]: list.slice(0, -1),
      };
    });
  };

  const handleClear = () => {
    setStrokesBySlide((prev) => ({
      ...prev,
      [slideId]: [],
    }));
  };

  const colors = ['#ef4444', '#f59e0b', '#10b981', '#38bdf8', '#ffffff'];

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className={`absolute inset-0 z-40 w-full h-full ${
          isEraser ? 'cursor-cell' : 'cursor-crosshair'
        }`}
      />

      {/* Annotation controls toolbar float */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-full shadow-2xl text-xs text-slate-200">
        <button
          onClick={() => setIsEraser(false)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${
            !isEraser ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-slate-400 hover:text-white'
          }`}
          title="Pen Mode"
        >
          <Pen className="w-3.5 h-3.5" />
          <span>Pen</span>
        </button>

        <button
          onClick={() => setIsEraser(true)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${
            isEraser ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-slate-400 hover:text-white'
          }`}
          title="Eraser Mode"
        >
          <Eraser className="w-3.5 h-3.5" />
          <span>Eraser</span>
        </button>

        <div className="w-[1px] h-4 bg-slate-700 mx-1" />

        <div className="flex items-center gap-1.5">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setIsEraser(false);
              }}
              className={`w-4 h-4 rounded-full border transition-transform ${
                color === c && !isEraser ? 'scale-125 border-white' : 'border-transparent hover:scale-110'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="w-[1px] h-4 bg-slate-700 mx-1" />

        <button
          onClick={handleUndo}
          disabled={currentStrokes.length === 0}
          className="p-1 text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400 transition-colors"
          title="Undo last stroke"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleClear}
          disabled={currentStrokes.length === 0}
          className="p-1 text-slate-400 hover:text-red-400 disabled:opacity-40 disabled:hover:text-slate-400 transition-colors"
          title="Clear all drawings on this slide"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </>
  );
}
