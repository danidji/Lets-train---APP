import React, { useEffect } from 'react';
import { Text, SafeAreaView, FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';

import AppButton from '../components/AppButton'

//Import redux
import { connect, useDispatch, useSelector } from "react-redux"
import { getPrograms } from '../store/actions';


// const programmes = [];
const colors = ["#BA1D35", "#F2D815", "#00C4C1"]

const getIcons = (level) => {
    let icon;
    switch (level) {
        case 1:
            icon = "happy-outline";
            break;
        case 2:
            icon = "fitness-outline";
            break;
        case 3:
            icon = "flash-outline";
            break;
        default:
            break;
    }
    return icon
}
// initialisation de la variable de connection à redux 
const mapStateToProps = (state) => {
    return state;
}

function Home(props) {
    const { route, navigation } = props;

    const dispatch = useDispatch();
    const programmes = useSelector(
        ({ programsReducer }) => programsReducer.programs
    ); // permet de selectionner le réducteurs qui m'intéresse

    //A l'affichage on appelle la fonction getPrograms
    useEffect(() => {
        dispatch(getPrograms());
    }, [dispatch])

    return (
        <SafeAreaView style={styles.main_container}>
            {programmes.length > 0 // Si la taille de mon tableau "programme" est >0 alors j'affiche mes éléments, sinon j'affiche mon élément de chargement
                ? (<FlatList
                    showsVerticalScrollIndicator={false} // Enlève les barres de scroll sur l'axe y
                    showsHorizontalScrollIndicator={false} // Enlève les barres de scroll sur l'axe x
                    data={programmes} // => tableau avec les données à afficher /!\
                    keyExtractor={(item) => item._id.toString()} // => toujours envoyer la clé unique /!\ en caractère => permet de définir un id unique à chaque élément
                    renderItem={({ item, index }) => ( //=> /!\ bien spécifier les accolades à l'intérieur des paramètres à envoyer -> c'est un objet
                        <>
                            <AppButton

                                onPress={() => {
                                    //On définit vers quel screen on veux aller, grace à la props name définit dans App
                                    navigation.navigate("Programme", {
                                        title: item.name
                                        , level: item.level
                                        , id: item._id
                                    })
                                }}
                                title={item.name}
                                image={item.poster_image}
                                color={colors[index]}
                                textPosition={index % 2 ? "left" : "right"}

                            />
                            <View style={styles.description}>

                                <Icon
                                    name={getIcons(item.level)}
                                    type='ionicon'
                                />
                                <Text style={styles.textDescription}>{item.description}</Text>
                            </View>
                        </>

                    )
                    }
                />)
                : (<ActivityIndicator style={styles.loader} size="large" color="#00C4C1" />)
            }

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1 // prends la largeur total de la colonne => flexDirection par défaut en colonne
        , marginTop: 10 // unité densité de pixel
        , padding: 10

        // , marginHorizontal: 10
    },
    loader: {
        flex: 1
    },
    description: {
        backgroundColor: '#C7CEDE'
        , flexDirection: 'row'
        , flex: 1
        , marginHorizontal: 10
        , paddingVertical: 5
        , paddingLeft: 5
        , marginBottom: 15
    },
    textDescription: {
        marginLeft: 5
        , fontWeight: "bold"
    }

})


export default connect(mapStateToProps)(Home); // on exporte la fonction home avec les méthodes lié à notre store redux