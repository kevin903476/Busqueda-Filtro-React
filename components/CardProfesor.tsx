import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

export default function CardProfesor({ datos }) {
  return (
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
}
