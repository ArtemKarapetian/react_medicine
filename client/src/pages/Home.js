import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Banner from '../components/Banner';
import Post from '../components/Good';

const banner = {
  title: 'Добро пожаловать!',
  description:
    "Это домашняя работа по НИСу. Автор: Карапетян Артём, студент 2 курса ФКН ПИ. Сделана с использованием JavaScript, React, Material UI, Go, SQLite.",
  image: "/images/1.jpg",
  imageText: 'main image description',
  linkText: 'Continue reading…',
};


const defaultTheme = createTheme();

export default function Home() {
  return (
    <>
      <Banner post={banner} />
    </>
  );
}