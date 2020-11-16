from bs4 import BeautifulSoup
import requests

class KiwiScraper:
    @staticmethod
    def scrape(departure_from,destination):
        url = f'https://kiwi.com/us/search/tiles/{departure_from}/{destination}'
        places = []
        prices = []
        links = []
        data = []

        res = requests.get(url).text
        soup = BeautifulSoup(res,'lxml')

        destination_name = soup.find_all('div',class_='Heading__StyledHeading-sc-1b8cso5-0')
        for i,dn in enumerate(destination_name):
            if dn.text == 'Explore trending destinations on the map':
                continue
            place = dn.text.replace('\xa0','')
            links.append(f"https://www.kiwi.com/us/search/results/belgrade-serbia/{place.lower()}-{destination.lower()}".replace(' ','-'))
            places.append(place)
        del places[1::2]
        del links[1::2]

        price_span = soup.find_all('span',class_='izAcIh')
        for p in price_span:
            price = p.findChildren()[2].text
            price_parts = price.split(' ')
            price_in_euros = round(float(price_parts[0].replace(',',''))/120)
            price_in_euros = f'{price_in_euros}€'
            prices.append(price_in_euros)

        for i,_ in enumerate(places):
            data.append({'place':places[i],'price':prices[i],'link':links[i]})
        return data