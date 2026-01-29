# Tutorial: Construir Content Analytics Dashboard desde CERO

> **Objetivo**: Aprender React "pensando en React" mientras construyes un proyecto real para tu portfolio.

## 🎯 Filosofía del Tutorial

- ✅ Escribirás CADA línea de código tú mismo
- ✅ Entenderás el PORQUÉ de cada decisión
- ✅ Aprenderás a "pensar en React"
- ✅ Construirás algo útil para tu portfolio
- ✅ Cada paso es pequeño y digerible

---

## FASE 0: Setup Inicial (30 min)

### Paso 1: Crear el proyecto

```bash
npm create vite@latest content-dashboard -- --template react-ts
cd content-dashboard
npm install
```

**¿Qué acabas de hacer?**

- Creaste un proyecto React con TypeScript usando Vite (más rápido que Create React App)
- `react-ts` = React + TypeScript template

### Paso 2: Instalar Tailwind CSS 4

```bash
npm install -D tailwindcss@next @tailwindcss/vite@next
```

**¿Qué es nuevo en Tailwind 4?**

- ✅ Más rápido (motor Oxide)
- ✅ Configuración más simple con CSS
- ✅ No necesitas `tailwind.config.js`
- ✅ Integración directa con Vite

**Edita `vite.config.ts`:**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**¿Por qué este cambio?**

- Tailwind 4 usa un plugin de Vite en lugar de PostCSS
- Es más rápido y simple

**Edita `src/index.css`:**

```css
@import 'tailwindcss';

@theme {
  --color-primary: #0ea5e9;
  --color-primary-dark: #0284c7;
}
```

**¿Qué cambió?**

- ❌ Ya NO usamos `@tailwind base/components/utilities`
- ✅ Usamos `@import "tailwindcss"`
- ✅ Podemos definir variables CSS personalizadas con `@theme`
- ✅ Dark mode funciona automáticamente con la clase `dark`

### Paso 3: Test que funciona

```bash
npm run dev
```

Abre http://localhost:5173

**¿Ves la página de Vite + React?** ✅ Perfecto, sigamos.

---

## FASE 1: Estructura y Pensamiento en React (2 horas)

### 🧠 Concepto Clave: Pensar en React

Antes de escribir código, **pensamos en componentes**:

```
Dashboard (página)
├── Header (barra superior con título + dark mode)
├── StatsGrid (4 tarjetas con números)
│   ├── StatCard
│   ├── StatCard
│   ├── StatCard
│   └── StatCard
├── ChartsSection (gráficos)
│   ├── ViewsChart
│   └── EngagementChart
└── TopVideos (tabla)
```

**Regla de oro**: Si algo se repite, es un componente.

### Paso 4: Crear estructura de carpetas

```bash
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/charts
mkdir -p src/pages
mkdir -p src/types
mkdir -p src/data
```

**¿Por qué esta estructura?**

- `ui/` = Componentes reutilizables (Button, Card)
- `layout/` = Componentes de estructura (Header, Footer)
- `charts/` = Componentes de gráficos
- `pages/` = Páginas completas
- `types/` = Tipos de TypeScript
- `data/` = Datos mock

### Paso 5: Tu primer componente - Button

**Crea `src/components/ui/Button.tsx`:**

```tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
    >
      {children}
    </button>
  );
};
```

**¡PARA! Entiende cada línea:**

1. `interface ButtonProps` = Define qué props acepta el componente
2. `children: React.ReactNode` = Cualquier cosa que pongas dentro del botón
3. `onClick?: () => void` = `?` significa opcional, `() => void` es una función
4. `className` = Clases de Tailwind para estilizar
5. `{children}` = Renderiza lo que pongas dentro

**Probémoslo. Edita `src/App.tsx`:**

```tsx
import { Button } from './components/ui/Button';

function App() {
  return (
    <div className="p-8">
      <Button onClick={() => alert('¡Funciona!')}>Click me</Button>
    </div>
  );
}

export default App;
```

**Guarda y mira el navegador.** ¿Ves el botón? ¿Hace alert al clickear? ✅

---

### Paso 6: Componente con estado - Dark Mode Toggle

**Concepto nuevo: `useState`**

React re-renderiza cuando el estado cambia. Piensa en el estado como "memoria" del componente.

**Crea `src/components/layout/Header.tsx`:**

```tsx
import { useState } from 'react';

export const Header = () => {
  // Estado: isDark empieza en false
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark); // Invierte el valor

    // Agrega/quita clase 'dark' al HTML
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 p-4 shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Content Analytics
        </h1>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};
```

**Entiende el código:**

1. `useState(false)` = Estado inicial es `false`
2. `isDark` = Valor actual del estado
3. `setIsDark` = Función para cambiar el estado
4. `!isDark` = NOT isDark (lo invierte)
5. `dark:bg-gray-800` = Tailwind aplica esto SOLO en dark mode

**Usa el Header. Edita `src/App.tsx`:**

```tsx
import { Header } from './components/layout/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
    </div>
  );
}

export default App;
```

**Pruébalo.** Click en el emoji. ¿Cambia a dark mode? ✅

---

### 🎯 CHECKPOINT 1

**¿Qué has aprendido hasta ahora?**

- ✅ Crear proyecto React + TypeScript
- ✅ Setup de Tailwind CSS
- ✅ Estructura de carpetas
- ✅ Componentes básicos (Button)
- ✅ Props y interfaces
- ✅ Estado con useState
- ✅ Dark mode

**Tómate 10 min de descanso. Lo estás haciendo genial.**

---

## FASE 2: Datos y Tipos (1 hora)

### Paso 7: Definir tipos TypeScript

**¿Por qué primero los tipos?**
Porque definen la "forma" de tus datos. TypeScript te ayudará a no meter la pata.

**Crea `src/types/index.ts`:**

```tsx
export interface Video {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  uploadDate: string;
}
```

**Esto dice:** "Un Video SIEMPRE tiene estas propiedades con estos tipos"

### Paso 8: Crear datos mock

**Crea `src/data/videos.ts`:**

```tsx
import { Video } from '../types';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Tutorial de React para principiantes',
    views: 125000,
    likes: 8500,
    comments: 450,
    uploadDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Hooks avanzados en React',
    views: 89000,
    likes: 6200,
    comments: 380,
    uploadDate: '2024-01-20',
  },
  {
    id: '3',
    title: 'TypeScript desde cero',
    views: 156000,
    likes: 12000,
    comments: 680,
    uploadDate: '2024-01-22',
  },
];
```

**¿Por qué mockVideos: Video[]?**

- TypeScript verifica que cada objeto cumpla con la interfaz Video
- Si te falta una propiedad, te dará error

---

## FASE 3: Tu Primer Componente "Real" (1 hora)

### Paso 9: StatCard - Componente de métrica

**Concepto**: Este componente muestra UNA métrica (views, likes, etc)

**Crea `src/components/ui/StatCard.tsx`:**

```tsx
interface StatCardProps {
  title: string;
  value: number;
  icon: string;
}

export const StatCard = ({ title, value, icon }: StatCardProps) => {
  // Función para formatear números grandes
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {formatNumber(value)}
          </p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};
```

**¿Qué aprendiste nuevo aquí?**

- Función dentro del componente (`formatNumber`)
- Renderizado condicional de números
- Layout con flexbox (Tailwind)

### Paso 10: Usar StatCard en el Dashboard

**Crea `src/pages/Dashboard.tsx`:**

```tsx
import { StatCard } from '../components/ui/StatCard';
import { mockVideos } from '../data/videos';

export const Dashboard = () => {
  // Calcular totales
  const totalViews = mockVideos.reduce((sum, video) => sum + video.views, 0);
  const totalLikes = mockVideos.reduce((sum, video) => sum + video.likes, 0);
  const totalComments = mockVideos.reduce(
    (sum, video) => sum + video.comments,
    0,
  );

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Views" value={totalViews} icon="👁️" />
        <StatCard title="Total Likes" value={totalLikes} icon="❤️" />
        <StatCard title="Total Comments" value={totalComments} icon="💬" />
      </div>
    </div>
  );
};
```

**¡PARA! Entiende `reduce`:**

```tsx
// reduce suma todos los views
mockVideos.reduce((sum, video) => sum + video.views, 0);
//                  ↑     ↑        ↑                  ↑
//               acumulador  item   qué sumar      valor inicial
```

**Actualiza `src/App.tsx`:**

```tsx
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
```

**Mira tu navegador.** ¿Ves 3 tarjetas con stats? ✅ ¡Brutal!

---

### 🎯 CHECKPOINT 2

**Lo que llevas:**

- ✅ Header con dark mode
- ✅ 3 StatCards mostrando datos reales
- ✅ Cálculos con reduce
- ✅ Tipos TypeScript funcionando

**Siguiente nivel: Gráficos. Pero primero descansa 10 min.**

---

## FASE 4: Gráficos con Recharts (2 horas)

### Paso 11: Instalar Recharts

```bash
npm install recharts
```

### Paso 12: Tu primer gráfico

**Crea `src/components/charts/SimpleChart.tsx`:**

```tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { mockVideos } from '../../data/videos';

export const SimpleChart = () => {
  // Preparar datos para el gráfico
  const chartData = mockVideos.map((video) => ({
    name: video.title.substring(0, 15) + '...', // Truncar título
    views: video.views,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Views por Video
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip />
          <Bar dataKey="views" fill="#0ea5e9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
```

**Conceptos nuevos:**

1. `map()` transforma cada video en un objeto para el gráfico
2. `ResponsiveContainer` hace el gráfico responsive
3. `dataKey="name"` le dice al gráfico qué propiedad usar

**Agrega el gráfico al Dashboard:**

```tsx
// En Dashboard.tsx
import { SimpleChart } from '../components/charts/SimpleChart';

// Dentro del return, después de las StatCards:
<SimpleChart />;
```

**¿Ves un gráfico de barras?** 🎉 ¡Eres un crack!

---

## FASE 5: Estado Global con Zustand (1.5 horas)

### Paso 13: ¿Por qué necesitamos estado global?

**Problema actual:**

- El dark mode está en Header
- ¿Qué pasa si quieres usarlo en Dashboard?
- Tendrías que pasar props por muchos niveles (prop drilling)

**Solución: Zustand**

```bash
npm install zustand
```

### Paso 14: Crear tu primera store

**Crea `src/store/useAppStore.ts`:**

```tsx
import { create } from 'zustand';

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Estado inicial
  isDarkMode: false,

  // Acción para cambiar el estado
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.isDarkMode;

      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return { isDarkMode: newDarkMode };
    }),
}));
```

**Entiende esto:**

- `create()` crea la store
- `set()` modifica el estado
- Cualquier componente puede usar `useAppStore()`

### Paso 15: Usar la store en Header

**Actualiza `src/components/layout/Header.tsx`:**

```tsx
import { useAppStore } from '../../store/useAppStore';

export const Header = () => {
  // Obtener estado y acciones de la store
  const { isDarkMode, toggleDarkMode } = useAppStore();

  return (
    <header className="bg-white dark:bg-gray-800 p-4 shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Content Analytics
        </h1>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};
```

**¿Qué cambió?**

- ❌ Ya NO usamos `useState` local
- ✅ Usamos `useAppStore()` global
- Ahora CUALQUIER componente puede acceder al dark mode

---

### 🎯 CHECKPOINT FINAL

**Has construido:**

- ✅ App completa con React + TypeScript
- ✅ Dark mode global con Zustand
- ✅ StatCards con datos reales
- ✅ Gráfico con Recharts
- ✅ Tipos TypeScript funcionando

**¿Cuánto has aprendido? MUCHÍSIMO.**

---

## 🚀 SIGUIENTE NIVEL (Opcional para la semana 2)

### FASE 6: Búsqueda de Videos (1 hora)

#### Paso 16: Crear componente de búsqueda

**Concepto**: Filtrar videos en tiempo real mientras el usuario escribe.

**Crea `src/components/ui/VideoSearch.tsx`:**

```tsx
import { useState } from 'react';

interface VideoSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const VideoSearch = ({
  onSearch,
  placeholder = 'Buscar videos...',
}: VideoSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Llama a la función del padre
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />

        {/* Icono de búsqueda */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </div>

        {/* Botón para limpiar */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Contador de resultados */}
      {searchTerm && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Buscando: "{searchTerm}"
        </p>
      )}
    </div>
  );
};
```

**Conceptos nuevos:**

1. `onChange` - Se ejecuta cada vez que escribes
2. `e.target.value` - El valor actual del input
3. Renderizado condicional con `{searchTerm && (...)}`
4. Props callback `onSearch` - Comunica al componente padre

#### Paso 17: Agregar filtrado al Dashboard

**Actualiza `src/pages/Dashboard.tsx`:**

```tsx
import { useState } from 'react';
import { StatCard } from '../components/ui/StatCard';
import { VideoSearch } from '../components/ui/VideoSearch';
import { SimpleChart } from '../components/charts/SimpleChart';
import { mockVideos } from '../data/videos';

export const Dashboard = () => {
  // Estado para el término de búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar videos basado en la búsqueda
  const filteredVideos = mockVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calcular totales con videos filtrados
  const totalViews = filteredVideos.reduce(
    (sum, video) => sum + video.views,
    0,
  );
  const totalLikes = filteredVideos.reduce(
    (sum, video) => sum + video.likes,
    0,
  );
  const totalComments = filteredVideos.reduce(
    (sum, video) => sum + video.comments,
    0,
  );

  return (
    <div className="p-8">
      {/* Barra de búsqueda */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Buscar Videos
        </h2>
        <VideoSearch onSearch={setSearchQuery} />

        {/* Mostrar cantidad de resultados */}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Mostrando {filteredVideos.length} de {mockVideos.length} videos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Views" value={totalViews} icon="👁️" />
        <StatCard title="Total Likes" value={totalLikes} icon="❤️" />
        <StatCard title="Total Comments" value={totalComments} icon="💬" />
      </div>

      {/* Gráfico */}
      <SimpleChart />
    </div>
  );
};
```

**¿Qué aprendiste?**

1. `filter()` - Filtra arrays basado en una condición
2. `toLowerCase()` - Búsqueda case-insensitive
3. `includes()` - Verifica si un string contiene otro
4. Comunicación padre-hijo con callbacks

#### Paso 18: Lista de videos filtrados

**Crea `src/components/ui/VideoList.tsx`:**

```tsx
import { Video } from '../../types';

interface VideoListProps {
  videos: Video[];
}

export const VideoList = ({ videos }: VideoListProps) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No se encontraron videos 😢
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Likes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Comentarios
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {videos.map((video) => (
              <tr
                key={video.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {video.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {video.views.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {video.likes.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {video.comments.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(video.uploadDate).toLocaleDateString('es-ES')}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

**Agrega la lista al Dashboard:**

```tsx
// En Dashboard.tsx, importa VideoList
import { VideoList } from '../components/ui/VideoList';

// Después del gráfico, agrega:
<div className="mt-8">
  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
    Videos
  </h2>
  <VideoList videos={filteredVideos} />
</div>;
```

**¿Qué aprendiste?**

1. Renderizado condicional (sin resultados)
2. Tablas responsive con Tailwind
3. `toLocaleString()` - Formatear números con comas
4. `toLocaleDateString()` - Formatear fechas
5. `key` prop en listas (React necesita esto)

---

### Ejercicios adicionales para practicar:

1. **Agrega más videos** a `mockVideos`
2. **Crea un LineChart** de views en el tiempo
3. **Agrega filtros** por fecha
4. **Ordena la tabla** por columnas (clickeando en headers)
5. **Agrega paginación** a la tabla
6. **Crea un selector** de categorías

### Tips para seguir:

1. **Lee el código que escribiste** línea por línea
2. **Cambia cosas** y mira qué rompe
3. **Googlea errores** - es parte del proceso
4. **No copies y pegues** - escribe cada línea

---

## 📚 Recursos para aprender más:

- [React Docs oficial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Recharts Examples](https://recharts.org/en-US/examples)

---

## ❓ FAQs de Principiantes

**P: ¿Por qué usar TypeScript?**
R: Te avisa de errores ANTES de ejecutar el código.

**P: ¿Por qué Tailwind?**
R: Escribes estilos más rápido y el CSS final es pequeño.

**P: ¿Por qué Zustand y no Redux?**
R: Zustand es más simple. Redux es overkill para proyectos pequeños.

**P: ¿Cuándo usar useState vs Zustand?**
R: `useState` para estado local (un componente). Zustand para estado compartido (muchos componentes).

**P: ¿Qué es un "componente"?**
R: Una función que devuelve HTML (JSX). Piensa en piezas de LEGO reutilizables.

---

## 🎓 Conceptos que aprendiste:

- ✅ JSX y componentes
- ✅ Props e interfaces
- ✅ Estado con useState
- ✅ Estado global con Zustand
- ✅ Renderizado de listas con map
- ✅ Cálculos con reduce
- ✅ Tipos de TypeScript
- ✅ Tailwind CSS
- ✅ Dark mode
- ✅ Gráficos con Recharts

**Esto es MÁS de lo que muchos devs saben después de un curso completo.**

---

## ✨ Mensaje final

**No te agobies si no entiendes todo a la primera.**

React tiene curva de aprendizaje. Pero si sigues este tutorial:

1. Escribiendo cada línea
2. Entendiendo cada concepto
3. Practicando con ejercicios

En 2 semanas tendrás un proyecto real y conocimiento sólido.

**¡Adelante, crack! 🚀**
