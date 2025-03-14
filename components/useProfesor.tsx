import { View, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import { DATOS } from './api';


export default function useProfesor() {
    //Filtros
  const [busqueda, setBusqueda] = useState(''); // Estado para el texto de búsqueda
  const [paisSeleccionado, setPaisSeleccionado] = useState(''); // Guarda el país seleccionado
  const [universidadSeleccionado, setUniversidadSeleccionado] = useState(''); // Guarda la universidad seleccionado
  const [carreraSeleccionado, setcarreraSeleccionado] = useState(''); // Guarda la carrera seleccionado
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(''); // Guarda la materia seleccionado
  const [fechaSeleccionada, setFechaSeleccionada] = useState(''); // Guarda la fecha seleccionado
  const [modalidadSeleccionada, setModalidadSeleccionada] = useState(''); // Guarda la modalidad seleccionado

  const filtrosIniciales = useRef({
    pais: "",
    universidad: "",
    carrera: "",
    materia: "",
    fecha: "",
    modalidad: "",
  });
  

  // Función para reiniciar los filtros
  const reiniciarFiltros = () => {
    setPaisSeleccionado(filtrosIniciales.current.pais);
    setUniversidadSeleccionado(filtrosIniciales.current.universidad);
    setcarreraSeleccionado(filtrosIniciales.current.carrera);
    setMateriaSeleccionada(filtrosIniciales.current.materia);
    setFechaSeleccionada(filtrosIniciales.current.fecha);
    setModalidadSeleccionada(filtrosIniciales.current.modalidad);
  };
  // Filtrar la lista
  const datosFiltrados = DATOS.filter(
    (item) =>
      // Búsqueda por la caja de texto
      (busqueda
        ? item.materia.toLowerCase().includes(busqueda.toLowerCase()) ||
          item.pais.toLowerCase().includes(busqueda.toLowerCase()) ||
          item.universidad.toLowerCase().includes(busqueda.toLowerCase()) ||
          item.carrera.toLowerCase().includes(busqueda.toLowerCase()) ||
          item.horario.toLowerCase().includes(busqueda.toLowerCase()) ||
          item.modalidad.toLowerCase().includes(busqueda.toLowerCase())
        : true) &&
      // Aplicar filtros
      (paisSeleccionado ? item.pais === paisSeleccionado : true) &&
      (universidadSeleccionado ? item.universidad === universidadSeleccionado : true) &&
      (carreraSeleccionado ? item.carrera === carreraSeleccionado : true) &&
      (materiaSeleccionada
        ? item.materia.toLowerCase().includes(materiaSeleccionada.toLowerCase())
        : true) &&
      (fechaSeleccionada
        ? item.horario.toLowerCase().includes(fechaSeleccionada.toLowerCase())
        : true) &&
      (modalidadSeleccionada ? item.modalidad === modalidadSeleccionada : true)
  );

  return {
    datosFiltrados,
    busqueda,
    setBusqueda,
    paisSeleccionado,
    setPaisSeleccionado,
    universidadSeleccionado,
    setUniversidadSeleccionado,
    carreraSeleccionado,
    setcarreraSeleccionado,
    materiaSeleccionada,
    setMateriaSeleccionada,
    fechaSeleccionada,
    setFechaSeleccionada,
    modalidadSeleccionada,
    setModalidadSeleccionada,
    reiniciarFiltros
  };
}
