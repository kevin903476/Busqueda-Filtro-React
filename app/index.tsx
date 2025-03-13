import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Stack } from 'expo-router';
import { MaterialIcons, Fontisto, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Datos simulados de personas con materias
const DATOS = [
  {
    id: '1',
    nombre: 'Mario Alfredo',
    materia: 'Administración de Redes',
    universidad: 'UTN',
    carrera: 'ITI',
    pais: 'Costa Rica',
    modalidad: 'Virtual',
    horario: 'Martes y Jueves en la mañana',
    imagen: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    nombre: 'Hermenegildo Paladino',
    materia: 'Cálculo y Álgebra Lineal',
    universidad: 'UTN',
    carrera: 'ITI',
    pais: 'Costa Rica',
    modalidad: 'Presencial',
    horario: 'Viernes en la mañana',
    imagen: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '3',
    nombre: 'Keven Antonio Solis',
    materia: 'Programación I',
    pais: 'Colombia',
    universidad: 'UTN',
    carrera: 'ITI',
    modalidad: 'Presencial',
    horario: 'Viernes en la tarde',
    imagen: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    nombre: 'Mario Alfredo',
    materia: 'Administacrión de Servidores',
    pais: 'Colombia',
    universidad: 'UPTC',
    carrera: 'ITI',
    modalidad: 'Presencial',
    horario: 'Martes y Jueves 9am - 10am',
    imagen: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: '6',
    nombre: 'Messi Ronaldo Diaz',
    materia: 'Programación II',
    pais: 'Colombia',
    universidad: 'UPTC',
    carrera: 'ITI',
    modalidad: 'Presencial',
    horario: 'Viernes 11am - 12pm',
    imagen: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    id: '7',
    nombre: 'Enrique Adonai',
    materia: 'Administaración de Redes',
    pais: 'Colombia',
    universidad: 'UPTC',
    carrera: 'ITI',
    modalidad: 'Híbrida',
    horario: 'Lunes 5am - 1pm',
    imagen: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
];

export default function Inicio() {
  const [busqueda, setBusqueda] = useState(''); // Estado para el texto de búsqueda
  const [mostrarModalFiltro, setMostrarModalFiltro] = useState(false); // Controla si el modal de filtros está habilitado
  const [paisSeleccionado, setPaisSeleccionado] = useState(''); // Guarda el país seleccionado
  const [mostrarPaises, setMostrarPaises] = useState(false); // Controla si se despliega la lista de países
  const [universidadSeleccionado, setUniversidadSeleccionado] = useState(''); // Guarda la universidad seleccionado
  const [mostrarUniversidad, setMostrarUniversidad] = useState(false); // Controla si se despliega la lista de universidad
  const [carreraSeleccionado, setcarreraSeleccionado] = useState(''); // Guarda la carrera seleccionado
  const [mostrarcarrera, setMostrarcarrera] = useState(false); // Controla si se despliega la lista de carrera
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(''); // Guarda la materia seleccionado
  const [mostrarMateria, setMostrarMateria] = useState(false); // Controla si se despliega la lista de materia

  const [fechaSeleccionada, setFechaSeleccionada] = useState(''); // Guarda la fecha seleccionado
  const [mostrarFecha, setMostrarFecha] = useState(false); // Controla si se despliega la lista de fecha

  const [modalidadSeleccionada, setModalidadSeleccionada] = useState(''); // Guarda la modalidad seleccionado
  const [mostrarModalidad, setMostrarModalidad] = useState(false); // Controla si se despliega la lista de modalidad

  // Función para seleccionar o deseleccionar un país
  const seleccionPais = (pais) => {
    if (paisSeleccionado === pais) {
      setPaisSeleccionado(''); // Si ya está seleccionado, se deselecciona
    } else {
      setPaisSeleccionado(pais); // Si no, se selecciona
    }
  };
  const seleccionUniversidad = (uni) => {
    if (universidadSeleccionado === uni) {
      setUniversidadSeleccionado('');
    } else {
      setUniversidadSeleccionado(uni);
    }
  };
  const seleccionCarrera = (carrer) => {
    if (carreraSeleccionado === carrer) {
      setcarreraSeleccionado('');
    } else {
      setcarreraSeleccionado(carrer);
    }
  };
  const seleccionaMateria = (mat) => {
    if (materiaSeleccionada === mat) {
      setMateriaSeleccionada('');
    } else {
      setMateriaSeleccionada(mat);
    }
  };
  const seleccionaFecha = (fech) => {
    if (fechaSeleccionada === fech) {
      setFechaSeleccionada('');
    } else {
      setFechaSeleccionada(fech);
    }
  };
  const seleccionaModalidad = (mod) => {
    if (modalidadSeleccionada === mod) {
      setModalidadSeleccionada('');
    } else {
      setModalidadSeleccionada(mod);
    }
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

  return (
    <View className="flex-1 bg-[#082F49] p-4">
      <Stack.Screen options={{ title: 'Buscador' }} />

      {/* Campo de búsqueda con icono de filtro */}
      <View className="mb-4 flex-row items-center rounded-full bg-white px-4 py-2">
        <TextInput
          className="flex-1 text-black"
          placeholder="Buscar materia..."
          placeholderTextColor="#888"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        {/* Botón de filtro */}
        <TouchableOpacity onPress={() => setMostrarModalFiltro(true)}>
          <MaterialIcons name="filter-alt" size={24} color="blue" />
        </TouchableOpacity>
      </View>

      {/* Lista de tarjetas filtradas */}
      <FlatList
        data={datosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TarjetaPersona datos={item} />}
      />

      {/* Modal de Filtros */}
      <Modal visible={mostrarModalFiltro} animationType="slide" transparent>
        <View className="flex-1 items-center justify-center bg-black/50 ">
          <View className="max-h-[90vh] w-96 rounded-lg bg-[#E0F2FE] p-6">
            <ScrollView className="max-h-[80vh]">
              {/* Botón para mostrar los filtros de país */}
              <TouchableOpacity
                className="flex-row items-center justify-between rounded-lg bg-blue-500 p-3"
                /* Se pone como !mostrarPaises porque en ocaciones es true o false depende si es activado o no */
                onPress={() => setMostrarPaises(!mostrarPaises)}>
                <View className="flex-row items-center">
                  <Fontisto name="world-o" size={12} color="white" className="mr-4" />
                  <Text className="font-bold text-white">País</Text>
                </View>

                <MaterialIcons
                  name={mostrarPaises ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>

              {/* Lista de países (se muestra solo si mostrarPaises es true) */}
              {mostrarPaises && (
                <View className="mt-2 rounded-lg bg-blue-200 p-2">
                  {['Argentina', 'Colombia', 'Costa Rica', 'España'].map((pais) => (
                    <TouchableOpacity
                      key={pais}
                      onPress={() => seleccionPais(pais)}
                      className="mb-2 flex-row items-center">
                      {/* Casilla de selección (checkbox) */}
                      <View
                        className={`h-5 w-5 rounded border-2 ${paisSeleccionado === pais ? 'bg-blue-500' : 'border-gray-500'}`}
                      />
                      <Text className="ml-2">{pais}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {/* Universidad */}
              <TouchableOpacity
                className="mt-5 flex-row items-center justify-between rounded-lg bg-blue-500 p-3"
                /* Se pone como !mostrarUniversidad porque en ocaciones es true o false depende si es activado o no */
                onPress={() => setMostrarUniversidad(!mostrarUniversidad)}>
                <View className="flex-row items-center">
                  <FontAwesome name="university" size={12} color="white" className="mr-4" />
                  <Text className="font-bold text-white">Universidad</Text>
                </View>
                <MaterialIcons
                  name={mostrarUniversidad ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>

              {mostrarUniversidad && (
                <View className="mt-2 rounded-lg bg-blue-200 p-2">
                  {['UTN', 'UPTC', 'UNA', 'TEC'].map((uni) => (
                    <TouchableOpacity
                      key={uni}
                      onPress={() => seleccionUniversidad(uni)}
                      className="mb-2 flex-row items-center">
                      {/* Casilla de selección (checkbox) */}
                      <View
                        className={`h-5 w-5 rounded border-2 ${universidadSeleccionado === uni ? 'bg-blue-500' : 'border-gray-500'}`}
                      />
                      <Text className="ml-2">{uni}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Carrera */}
              <TouchableOpacity
                className="mt-5 flex-row items-center justify-between rounded-lg bg-blue-500 p-3"
                /* Se pone como !mostrarUniversidad porque en ocaciones es true o false depende si es activado o no */
                onPress={() => setMostrarcarrera(!mostrarcarrera)}>
                <View className="flex-row items-center">
                  <FontAwesome name="address-book" size={12} color="white" className="mr-4" />
                  <Text className="font-bold text-white">Carrera</Text>
                </View>{' '}
                <MaterialIcons
                  name={mostrarcarrera ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>

              {mostrarcarrera && (
                <View className="mt-2 rounded-lg bg-blue-200 p-2">
                  {['ILE', 'ISOA', 'GAE', 'ITI'].map((carrer) => (
                    <TouchableOpacity
                      key={carrer}
                      onPress={() => seleccionCarrera(carrer)}
                      className="mb-2 flex-row items-center">
                      {/* Casilla de selección (checkbox) */}
                      <View
                        className={`h-5 w-5 rounded border-2 ${carreraSeleccionado === carrer ? 'bg-blue-500' : 'border-gray-500'}`}
                      />
                      <Text className="ml-2">{carrer}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Materia */}
              <TouchableOpacity
                className="mt-5 flex-row items-center justify-between rounded-lg bg-blue-500 p-3"
                /* Se pone como !mostrarUniversidad porque en ocaciones es true o false depende si es activado o no */
                onPress={() => setMostrarMateria(!mostrarMateria)}>
                <View className="flex-row items-center">
                  <FontAwesome name="book" size={12} color="white" className="mr-4" />
                  <Text className="font-bold text-white">Materia</Text>
                </View>{' '}
                <MaterialIcons
                  name={mostrarMateria ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>

              {mostrarMateria && (
                <View className="mt-2 rounded-lg bg-blue-200 p-2">
                  {['Programación', 'Redes', 'Cálculo', 'Servidores', 'Álgebra'].map((mat) => (
                    <TouchableOpacity
                      key={mat}
                      onPress={() => seleccionaMateria(mat)}
                      className="mb-2 flex-row items-center">
                      {/* Casilla de selección (checkbox) */}
                      <View
                        className={`h-5 w-5 rounded border-2 ${materiaSeleccionada === mat ? 'bg-blue-500' : 'border-gray-500'}`}
                      />
                      <Text className="ml-2">{mat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Fecha */}
              <TouchableOpacity
                className="mt-5 flex-row items-center justify-between rounded-lg bg-blue-500 p-3"
                /* Se pone como !mostrarUniversidad porque en ocaciones es true o false depende si es activado o no */
                onPress={() => setMostrarFecha(!mostrarFecha)}>
                <View className="flex-row items-center">
                  <FontAwesome name="calendar" size={12} color="white" className="mr-4" />
                  <Text className="font-bold text-white">Fecha</Text>
                </View>
                <MaterialIcons
                  name={mostrarFecha ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>

              {mostrarFecha && (
                <View className="mt-2 rounded-lg bg-blue-200 p-2">
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(
                    (fech) => (
                      <TouchableOpacity
                        key={fech}
                        onPress={() => seleccionaFecha(fech)}
                        className="mb-2 flex-row items-center">
                        {/* Casilla de selección (checkbox) */}
                        <View
                          className={`h-5 w-5 rounded border-2 ${fechaSeleccionada === fech ? 'bg-blue-500' : 'border-gray-500'}`}
                        />
                        <Text className="ml-2">{fech}</Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              )}

              {/* Modalidad */}
              <TouchableOpacity
                className="mt-5 flex-row items-center justify-between rounded-lg bg-blue-500 p-3"
                onPress={() => setMostrarModalidad(!mostrarModalidad)}>
                <View className="flex-row items-center">
                  <FontAwesome5 name="book-reader" size={12} color="white" className="mr-4" />
                  <Text className="font-bold text-white">Modalidad</Text>
                </View>
                <MaterialIcons
                  name={mostrarModalidad ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>

              {mostrarModalidad && (
                <View className="mt-2 rounded-lg bg-blue-200 p-2">
                  {['Virtual', 'Presencial', 'Híbrida'].map((mod) => (
                    <TouchableOpacity
                      key={mod}
                      onPress={() => seleccionaModalidad(mod)}
                      className="mb-2 flex-row items-center">
                      {/* Casilla de selección (checkbox) */}
                      <View
                        className={`h-5 w-5 rounded border-2 ${modalidadSeleccionada === mod ? 'bg-blue-500' : 'border-gray-500'}`}
                      />
                      <Text className="ml-2">{mod}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>
            {/* Botón para aplicar los filtros y cerrar el modal */}
            <TouchableOpacity
              className="mt-4 rounded bg-blue-700 p-2"
              onPress={() => setMostrarModalFiltro(false)}>
              <Text className="text-center text-white">Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Componente de Tarjeta para mostrar información de cada persona
const TarjetaPersona = ({ datos }) => (
  <View className="mb-4 rounded-lg bg-[#38BDF8] p-4">
    <View className="flex-row items-center">
      {/* Imagen de la persona */}
      <Image source={{ uri: datos.imagen }} className="mr-4 h-20 w-20 rounded-full" />
      <View className="flex-1">
        {/* Datos personales */}
        <Text className="text-lg font-bold text-white">{datos.materia}</Text>
        <Text className="text-white">{datos.nombre}</Text>
        <Text className="text-white">
          {datos.universidad} · {datos.carrera}
        </Text>
        <Text className="text-white">
          {datos.pais} · {datos.modalidad}
        </Text>
        <Text className="text-white">{datos.horario}</Text>
      </View>
    </View>
    {/* Botón de Agendar Cita */}
    <TouchableOpacity className="mt-3 rounded-lg bg-[#0C4A6E] py-2">
      <Text className="text-center text-white">Agendar Cita</Text>
    </TouchableOpacity>
  </View>
);
